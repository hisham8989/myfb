const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller')

/**
 * router.get('/users/contollerName,controllerFile.controllerMethod)
 */
router.get('/profile',usersController.profile)

router.get('/sign-up',usersController.signUp)
router.get('/sign-in',usersController.signIn)

/** create user route */

router.post('/create',usersController.create)

module.exports = router;