"use strict";

const EventEmitter = require('events').EventEmitter;
const apn = require('apn');
const gcm = require('node-gcm');
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
    let apn = new apn.Connection(config.pan);
    super(apn);
  }
}

class AndroidPushClient extends PushClient {

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
