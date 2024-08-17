const express = require('express')
const router = express.Router();
const authControllere = require('../controller/authControler')
const { registerValidator, loginValidator } = require('../helper/validator')
const auth = require('../middleware/authMiddleware')

router.post('/register', registerValidator, authControllere.registerUser)
router.post('/login', loginValidator, authControllere.loginUser)

router.get('/profile',auth, authControllere.getProfile)

module.exports = router