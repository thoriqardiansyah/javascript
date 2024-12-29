const express = require('express')

const { validator } = require('../middleware')
const { SchemaCredentials } = require('../model')
const {userController: uc} = require('../controller')

const router = express()

router.post('/sign-up', validator(SchemaCredentials), uc.register)
router.post('/sign-in', validator(SchemaCredentials), uc.login)

module.exports = router