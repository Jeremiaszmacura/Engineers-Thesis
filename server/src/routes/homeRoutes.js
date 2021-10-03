const express = require("express");
const homeController = require("../controllers/homeController");

const router = express.Router();


/**
 * @swagger
 * /:
 *  get:
 *    description: Use to get home page
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", homeController.homeIndex);

/**
 * @swagger
 * /:
 *  post:
 *    description: Use to get starting test page by passing test code
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post("/", homeController.homePostCode);


module.exports = router;
