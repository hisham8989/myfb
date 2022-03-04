const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home_controller')

router.get('/', homeController.home)

// forwarding routes
// router.use('/routerName', require('./routerFile'))

router.use('/users', require('./users'))

router.use('/posts',require('./posts'))
router.use('/comments',require('./comments'))

module.exports = router
