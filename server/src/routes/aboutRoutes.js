const express = require("express");
const aboutController = require("../controllers/aboutController");

const router = express.Router();


/**
 * @swagger
 * /about':
 *  get:
 *    description: Use to get about page
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", aboutController.aboutIndex);


module.exports = router;
