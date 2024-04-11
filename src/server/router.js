let express = require('express')
let router = express.Router()
let login = require('./API/login')
let publish = require('./API/publish')
let mine = require('./API/mine')

router.post('/login',login.login)
router.post('/publish',publish.publish)
router.post('/publishProfile',mine.publishProfile)
router.get('/getUserInfo',mine.getUserInfo)
router.get('/getTravelInfo',mine.getTravelInfo)
router.get('/getImageInfo',mine.getImageInfo)

module.exports = router