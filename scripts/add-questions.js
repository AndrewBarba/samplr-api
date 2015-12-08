
const async = require('async');
const moment = require('moment');
const Response = require('modules/response');
const Question = require('modules/question');
const utils = require('lib/utils');

const USER_ID = '34df13c4-3eda-4797-819f-e02d7a4ffd48';
const SURVEY_ID = 'dd526ef8-4ace-4b76-83a7-5e4ab1a5337c';

async.waterfall([
  done => {
    Question.create({
      title: `How are you, ${utils.randomHex(16)}?`,
      surveyId: SURVEY_ID,
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
    async.times(50, (int, done) => {
      Response.create({
        userId: USER_ID,
        surveyId: question.surveyId,
        questionId: question.id,
        state: 'READY',
        value: parseInt(Math.random() * 1.99),
        date: moment().add(1, 'year').toDate()
      }, done);
    }, done);
  }
], () => {
  process.exit();
});
