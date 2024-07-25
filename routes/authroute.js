const express = require('express')
const router = express.Router();
const authControllere = require('../controller/authControler')
const {registerValidator ,loginValidator}=require('../helper/validator')


router.post('/register',registerValidator, authControllere.registerUser)
router.post('/login',loginValidator,authControllere.loginUser)

module.exports = router