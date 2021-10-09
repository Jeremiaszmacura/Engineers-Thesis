const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();


/**
 * @swagger
 * /users/register:
 *  get:
 *    description: Use to get register page
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/register', usersController.registerIndex);

/**
 * @swagger
 * /users/register:
 *  post:
 *    description: Use to pass register data
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/register', usersController.registerPost);

/**
 * @swagger
 * /users/login':
 *  get:
 *    description: Use to get login page
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/login', usersController.loginIndex);

/**
 * @swagger
 * /users/logout':
 *  get:
 *    description: Use to logout user
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/logout', usersController.logout);

/**
 * @swagger
 * /users/login':
 *  post:
 *    description: Use to pass login data
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/login', usersController.loginPost);

/**
 * @swagger
 * /users/allUsers':
 *  get:
 *    description: Use to get all users
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/allUsers', usersController.allUsers);


module.exports = router;
