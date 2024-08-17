const express = require('express');
const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator, roleStoreValidator } = require('../helper/adminValidator');
const router = express.Router();
const permissionController = require('../controller/admin/permissionControl')
const roleController=require('../controller/admin/roleController')
const auth = require('../middleware/authMiddleware')
const { onlyAdminaccess } = require('../middleware/adminMiddleware')

//permission route
router.post('/add-permission', permissionAddValidator, auth, onlyAdminaccess, permissionController.addPermission)
router.get('/get-permission', auth, onlyAdminaccess, permissionController.getPermission)
router.post('/update-permission', auth, onlyAdminaccess, permissionUpdateValidator, permissionController.updatePermission)
router.delete('/delete-permission', auth, onlyAdminaccess, permissionDeleteValidator, permissionController.deletePermission)

//role routes

router.post('/role-store', roleStoreValidator, auth, onlyAdminaccess, roleController.roleStore)
router.get('/get-roles', auth, onlyAdminaccess, roleController.getRole)

module.exports = router