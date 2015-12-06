"use strict";

const EventEmitter = require('events').EventEmitter;
const apn = require('apn');
const gcm = require('node-gcm');
const moment = require('moment');
const logger = require('logger');
const config = require('config');

// Constants
const PUSH_TYPE = {
  IOS: 'ios',
  ANDROID: 'android'
};

class PushClient extends EventEmitter {

  constructor(client) {
    this._client = client;
  }

  get client() { return this._client; }
}

class iOSPushClient extends PushClient {

  constructor() {
    super(new apn.Connection(config.push.apn));
  }

  send(message, token) {
    var note = new apn.Notification();
    note.expiry = moment().add(30, 'minutes').toDate().getTime();
    note.sound = 'ping.aiff';
    note.alert = message;
    this.client.pushNotification(note, token);
  }
}

class AndroidPushClient extends PushClient {

  constructor() {
    super(new gcm.Sender(config.push.gcm.key));
  }

  send(message, token) {
    let am = new gcm.Message({
      collapseKey: 'Samplr',
      delayWhileIdle: false,
      data: {
        message: message
      }
    });

    this.client.send(am, [token], 2, err => {
      if (err) logger.error("Android GCM notification error", err);
    });
  }
}

class PushService extends EventEmitter {

  constructor() {
    this._iosClient = new iOSPushClient();
    this._androidClient = new AndroidPushClient();
  }

  get iosClient() { return this._iosClient; }
  get androidClient() { return this._androidClient; }

  send(message, token, type) {
    switch (type) {
      case PUSH_TYPE.IOS:
        return this.iosClient.send(message, token);
      case PUSH_TYPE.ANDROID:
        return this.iosClient.send(message, token);
    }
  }
}

module.exports = new PushService();
