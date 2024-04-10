let express = require('express')
let router = express.Router()
let login = require('./API/login')
let publish = require('./API/publish')

router.post('/login',login.login)
router.post('/publish',publish.publish)

module.exports = router