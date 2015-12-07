"use strict";

const Survey = require('modules/survey');
const Question = require('modules/question');
const Response = require('modules/response');
const User = require('modules/user');

/**
 * Get a survey
 *
 * @method read
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.read = (req, res, next) => {

  let surveyId = req.params.id;

  Survey.read(surveyId, (err, survey) => {
    if (err) return next(err);
    res.status(200).json(survey);
  });
};

/**
 * Create a new survey
 *
 * @method create
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.create = (req, res, next) => {

  let userId = req.userId;
  let groupId = req.body.groupId;
  let name = req.body.name;
  let schedule = req.body.schedule;

  Survey.create({
    userId: userId,
    groupId: groupId,
    name: name,
    schedule: schedule
  }, (err, survey) => {
    if (err) return next(err);
    res.status(201).json(survey);
  });
};

/**
 * Update a survey
 *
 * @method create
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.update = (req, res, next) => {

  let surveyId = req.params.id;
  let name = req.body.name;

  Survey.readAndUpdate(surveyId, {
    name: name
  }, (err, survey) => {
    if (err) return next(err);
    res.status(200).json(survey);
  });
};

/**
 * List questions for a survey
 *
 * @method listQuestions
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.listQuestions = (req, res, next) => {

  let surveyId = req.params.id;

  Question.listBySurveyId(surveyId, (err, questions) => {
    if (err) return next(err);
    res.status(200).json(questions);
  });
};

/**
 * List users in a survey
 *
 * @method listUsers
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.listUsers = (req, res, next) => {

  let surveyId = req.params.id;

  User.listBySurveyId(surveyId, (err, users) => {
    if (err) return next(err);
    res.status(200).json(users);
  });
};

/**
 * List responses for this survey
 *
 * @method listResponses
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.listResponses = (req, res, next) => {

  let surveyId = req.params.id;

  Response
    .listBySurveyId(surveyId)
    .getJoin({
      question: true
    })
    .run((err, resposnes) => {
      if (err) return next(err);
      res.status(200).json(resposnes);
    });
};

/**
 * gets a CSV of responses on a survey givemn a survey ID
 * 
 * @mthod getCSV
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
exports.getCSV = (req,res,next) =>{
  let surveyId = req.params.id;
  
  Response.getCSV(surveyId, (err, responses) => {
    if(err) return next(err);
    let csvarray = ["lastName, firstName, date, answer, question"];
    responses.forEach((value)=>{      
      csvarray.push(
        value.right.lastName + ", " + 
        value.right.firstName + ", " + 
        value.left.date + ", " + 
        value.left.value + ", " + 
        value.left.questionId
        );
    });
    let csvString = csvarray.join("\n");
    res.status(200).json(csvString);
  });
};

/**
 * Adds a user to a survey
 *
 * @method addUser
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.addUser = (req, res, next) => {

  let surveyId = req.params.id;
  let userId = req.body.userId;
  let start = new Date(req.body.start);
  let end = new Date(req.body.end);

  Survey.addUser(surveyId, userId, start, end, (err, survey) => {
    if (err) return next(err);
    res.status(201).json(survey);
  });
};
