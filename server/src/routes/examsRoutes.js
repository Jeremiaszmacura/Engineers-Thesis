const express = require("express");
const examsController = require("../controllers/examsController");

const router = express.Router();


/**
 * @swagger
 * /exams':
 *  get:
 *    description: Use to get all exams (only admin allowed)
 *    responses:
 *      '200':
 *        description: A successful response
 */
 router.get("/", examsController.allExamsGet);


 /**
  * @swagger
  * /exams/create':
  *  post:
  *    description: Create Exam
  *    responses:
  *      '200':
  *        description: A successful response
  */
 router.post("/create", examsController.examCreatePost);
 
 
 /**
  * @swagger
  * /exams/:uuid':
  *  get:
  *    description: Get Exam passing uuid in url params
  *    responses:
  *      '200':
  *        description: A successful response
  */
 router.get("/:uuid", examsController.ExamGet);
 
 
 module.exports = router;
 