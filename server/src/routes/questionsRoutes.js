const express = require("express");
const questionsController = require("../controllers/questionsController");
const { authenticateUser } = require('../middleware/authentication');

const router = express.Router();


/**
 * @swagger
 * /questions/create/:uuid':
 *  post:
 *    description: Pass exam's uuid to create exma's question
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post("/create/:uuid", authenticateUser, questionsController.createQuestionPost);


/**
 * @swagger
 * /questions/:uuid':
 *  delete:
 *    description: Pass question's uuid to delete question
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete("/:uuid", authenticateUser, questionsController.deleteQuestionPost);


module.exports = router;
