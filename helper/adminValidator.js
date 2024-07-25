const { check } = require('express-validator')

exports.permissionAddValidator = [
    check('email', 'email is required').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('password', 'password is required').not().isEmpty(),
]