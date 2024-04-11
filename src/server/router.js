let express = require('express')
let router = express.Router()
let login = require('./API/login')
let publish = require('./API/publish')
let mine = require('./API/mine')
let appIndex = require('./API/appindex')

router.post('/login',login.login)
router.post('/publish',publish.publish)
router.post('/publishProfile',mine.publishProfile)
router.get('/getUserInfo',mine.getUserInfo)
router.get('/getTravelInfo',mine.getTravelInfo)
router.get('/getImageInfo',mine.getImageInfo)
// router.get('/getAllUserInfo',appIndex.getAllUserInfo)
// router.get('/getAllTravelInfo',appIndex.getAllTravelInfo)
// router.get('/getAllImageInfo',appIndex.getAllImageInfo)
router.post('/searchManager',appIndex)

module.exports = router