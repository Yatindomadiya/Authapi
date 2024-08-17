const { check } = require('express-validator');

exports.permissionAddValidator = [
    check('permission', 'Permission is required').notEmpty(),
    check('permission_name', 'Category name is required').notEmpty()
];

exports.permissionDeleteValidator = [
    check('id', 'ID is required').notEmpty()
];

exports.permissionUpdateValidator = [
    check('id', 'ID is required').notEmpty(),
    check('permission_name', 'Permission name is required').notEmpty()
];


exports.categoryAddValidator = [
    check('category_name', 'Category name is required').notEmpty()
];

exports.categoryDeleteValidator = [
    check('id', 'ID is required').notEmpty()
];

exports.categoryUpdateValidator = [
    check('id', 'ID is required').notEmpty(),
    check('category_name', 'Permission name is required').notEmpty()
];

exports.createPostValidator = [
    check('title', 'title is required').notEmpty(),
    check('description', 'description is required').notEmpty()
];

exports.deletePostValidator = [
    check('id', 'id is required').notEmpty(),
];

exports.updatePostValidator = [
    check('id', 'id is required').notEmpty(),
    check('title', 'title is required').notEmpty(),
    check('description', 'description is required').notEmpty()
];

exports.roleStoreValidator = [
    check('role_name', 'role_name is required').notEmpty(),
    check('value', 'value is required').notEmpty()
];
