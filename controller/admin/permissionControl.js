const { validationResult } = require('express-validator')
const Permission = require('../../model/permissionModel')
const { json } = require('express')

const addPermission = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Error',
                errors: errors.array()
            })
        }
        const { permission_name } = req.body

        const isExist = await Permission.findOne({ permission_name })

        if (isExist) {
            return res.status(400).json({
                success: false,
                msg: 'perminssion name is alredy exist'
            })
        }
        var obj = {
            permission_name,
        }
        if (req.body.default) {
            obj.is_default = parseInt(req.body.default)
        }
        const perminssion = new Permission(obj)
        const newPermission = await perminssion.save();

        return res.status(200).json({
            success: true,
            msg: 'perminssion add Successfully!',
            data: newPermission
        })
    }


    catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

const getPermission = async (req, res) => {
    try {
        const perminssion = await Permission.find({});

        return res.status(200).json({
            success: true,
            msg: "Permission successfully fetched",
            data: perminssion
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }

}
const updatePermission = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            })
        }
        const { id, permission_name } = req.body;

        const isExist = await Permission.findOne({ _id: id })

        if (!isExist) {
            res.status(400).json({
                success: false,
                msg: "Permission Id not found"
            })
        }

        const isNameAssigned = await Permission.findOne({
            _id: { $ne: id },
            permission_name
        })

        if (isNameAssigned) {
            res.status(400).json({
                success: false,
                msg: "permission name alredy assigned to another permmission"
            })
        }

        var obj = {
            permission_name
        }

        if (req.body.default != null) {
            obj.is_default = parseInt(req.body.default)
        }
        await Permission.findByIdAndUpdate(
            { _id: id },
            { $set: obj },
            { new: true }
        )

        return res.status(200).json({
            msg: "successfully update permission"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
const deletePermission = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            })
        }
        const { id } = req.body

        const IDexist = await Permission.findOne({_id:id})

        if (!IDexist) {
            return res.status(400).json({
                success: false,
                msg: "item is not ",
            })
        }
        await Permission.findByIdAndDelete({ _id: id })

        return res.status(200).json({
            success: true,
            msg: "Permission Deleted Successfully!"
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}
module.exports = { addPermission, getPermission, updatePermission, deletePermission }