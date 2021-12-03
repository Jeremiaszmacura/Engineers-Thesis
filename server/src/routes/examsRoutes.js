const express = require("express");
const examsController = require("../controllers/examsController");
const { authenticateUser } = require("../middleware/authentication");

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
 router.get("/", authenticateUser, examsController.allExamsGet);


 /**
 * @swagger
 * /exams/my-exams':
 *  get:
 *    description: Use to get all exams owned by current user
 *    responses:
 *      '200':
 *        description: A successful response
 */
  router.get("/my-exams", authenticateUser, examsController.myExamsGet);


   /**
  * @swagger
  * /exams/accessCode':
  *  post:
  *    description: Post accessCode and Get Exam with it's questions
  *    responses:
  *      '200':
  *        description: A successful response
  */
    router.post("/accessCode", examsController.examByAccessCodeGet);


 /**
  * @swagger
  * /exams/create':
  *  post:
  *    description: Create Exam
  *    responses:
  *      '200':
  *        description: A successful response
  */
 router.post("/create", authenticateUser, examsController.examCreatePost);

 
  /**
  * @swagger
  * /exams/solve-availability/:uuid':
  *  get:
  *    description: Check if exam if available to solve
  *    responses:
  *      '200':
  *        description: A successful response
  */
   router.get("/solve-availability/:uuid", examsController.examAvailabilityGet);


  /**
  * @swagger
  * /exams/solve/:uuid':
  *  get:
  *    description: Get Exam to solve passing uuid in url params
  *    responses:
  *      '200':
  *        description: A successful response
  */
  router.get("/solve/:uuid", examsController.solveExamGet);


    /**
  * @swagger
  * /exams/solve/:uuid':
  *  post:
  *    description: Post solved exam
  *    responses:
  *      '200':
  *        description: A successful response
  */
     router.post("/solve/:uuid", examsController.solveExamPost);

 
 /**
  * @swagger
  * /exams/:uuid':
  *  get:
  *    description: Get Exam with asigned question passing uuid in url params
  *    responses:
  *      '200':
  *        description: A successful response
  */
 router.get("/:uuid", authenticateUser, examsController.examGet);


 /**
  * @swagger
  * /exams/:uuid':
  *  delete:
  *    description: Delete Exam passing uuid in url params
  *    responses:
  *      '200':
  *        description: A successful response
  */
  router.delete("/:uuid", authenticateUser, examsController.examDelete);


   /**
  * @swagger
  * /exams/:uuid':
  *  put:
  *    description: Update Exam passing uuid in url params
  *    responses:
  *      '200':
  *        description: A successful response
  */
  router.put("/:uuid", authenticateUser, examsController.examUpdate);

 
 module.exports = router;
 