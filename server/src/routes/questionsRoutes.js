const express = require("express");
const questionsController = require("../controllers/questionsController");
const { authenticateUser } = require('../middleware/authentication');

const router = express.Router();


/**
 * @swagger
 * /exams':
 *  post:
 *    description: Pass exam's uuid to create exma's question
 *    responses:
 *      '200':
 *        description: A successful response
 */
 router.post("/create/:uuid", authenticateUser, questionsController.createQuestionPost);

 
 module.exports = router;
 