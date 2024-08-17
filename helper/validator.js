const { check } = require("express-validator");

exports.registerValidator = [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('password', 'password is required').not().isEmpty(),
]


exports.loginValidator = [
    check('email', 'email is required').isEmail().normalizeEmail({
        gmail_remove_dots: true 
    }),
    check('password', 'password is required').not().isEmpty(),
]


exports.createUserValidator = [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    // check('password', 'password is required').not().isEmpty(),
]

exports.updateUserValidator = [
    check('id', 'id is required').notEmpty(),
    check('name', 'name is required').notEmpty()
];

exports.deleteUserValidator = [
    check('id', 'id is required').notEmpty()
];

exports.LikeUnlikeValidator = [
    check('user_id', 'user_id is required').notEmpty(),
    check('post_id', 'post_id is required').notEmpty()
];