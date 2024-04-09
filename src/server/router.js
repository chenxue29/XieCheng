let express = require('express')
let router = express.Router()
let login = require('./API/login')

router.post('/login',login.login)

module.exports = router