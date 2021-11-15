const express = require("express");
const usersController = require("../controllers/usersController");
const { authenticateUser } = require('../middleware/authentication');

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
 * /users/checkIfLoggedIn':
 *  post:
 *    description: Check if user is logged in. Returns true/null
 *    responses:
 *      '200':
 *        description: A successful response
 */
 router.post("/checkIfLoggedIn", authenticateUser, usersController.checkIfLoggedIn);


/**
 * @swagger
 * /users/logout':
 *  get:
 *    description: Logout User
 *    responses:
 *      '200':
 *        description: A successful response
 */
 router.get("/logout", authenticateUser, usersController.logoutGet);


/**
 * @swagger
 * /users/allUsers':
 *  get:
 *    description: Get all Users
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/allUsers", authenticateUser, usersController.allUsersGet);


/**
 * @swagger
 * /users/:uuid':
 *  get:
 *    description: Get User
 *    responses:
 *      '200':
 *        description: A successful response
 */
 router.get("/:uuid", authenticateUser, usersController.UserGet);


/**
 * @swagger
 * /users/:uuid':
 *  delete:
 *    description: Delete User
 *    responses:
 *      '200':
 *        description: A successful response
 */
 router.delete("/:uuid", authenticateUser, usersController.UserDelete);


 /**
 * @swagger
 * /users/:uuid':
 *  put:
 *    description: Update User
 *    responses:
 *      '200':
 *        description: A successful response
 */
  router.put("/:uuid", authenticateUser, usersController.UserUpdate);


module.exports = router;
