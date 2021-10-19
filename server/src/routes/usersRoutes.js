const express = require("express");
const usersController = require("../controllers/usersController");

const router = express.Router();


/**
 * @swagger
 * /users/register:
 *  post:
 *    description: Register User
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post("/register", usersController.registerPost);


/**
 * @swagger
 * /users/login':
 *  post:
 *    description: Login User
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post("/login", usersController.loginPost);


/**
 * @swagger
 * /users/allUsers':
 *  get:
 *    description: Get all Users
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/allUsers", usersController.allUsersGet);


/**
 * @swagger
 * /users/allUsers':
 *  get:
 *    description: Get User
 *    responses:
 *      '200':
 *        description: A successful response
 */
 router.get("/:uuid", usersController.UserGet);


module.exports = router;
