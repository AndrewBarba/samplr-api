
const async = require('async');
const Response = require('modules/response');
const Question = require('modules/question');
const utils = require('lib/utils');

const USER_ID = '34df13c4-3eda-4797-819f-e02d7a4ffd48';

async.waterfall([
  done => {
    Question.create({
      title: `How are you, ${utils.randomHex(16)}?`,
      surveyId: '1234',
      userId: '1234',
      responses: [{
        value: 0,
        text: "Bad"
      }, {
        value: 1,
        text: "Good"
      }]
    }, done);
  },
  (question, done) => {
    async.times(5, (int, done) => {
      Response.create({
        userId: USER_ID,
        surveyId: question.surveyId,
        questionId: question.id,
        state: 'READY',
        date: new Date()
      }, done);
    }, done);
  }
], () => {
  process.exit();
});
