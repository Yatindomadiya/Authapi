const Role = require('../../model/roleModel')
const { validationResult } = require('express-validator')

const roleStore = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Error',
                errors: errors.array()
            })
        }
        const { role_name, value } = req.body

        const roleData = new Role({
            role_name,
            value
        })
        await roleData.save()

        return res.status(200).json({
            success: true,
            msg: 'Create Role Successfully!',
            data: roleData
        })
    }


    catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

const getRole = async (req, res) => {
    try {

        const getRoleData = await Role.find(
            { value: { $ne: 1 } }
        )

        return res.status(200).json({
            success: true,
            msg: 'get Roles data Successfully!',
            data: getRoleData
        })
    }


    catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

module.exports = {
    roleStore,
    getRole
}