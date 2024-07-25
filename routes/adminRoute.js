const express = require('express');
const { permissionAddValidator } = require('../helper/adminValidator');
const router = express.Router();
const permissionController=require('../controller/admin/permissionControl')


router.post('/add-permission',permissionAddValidator,permissionController.addPermission)


module.exports = router