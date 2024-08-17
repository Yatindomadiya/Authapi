const User = require('../model/userModel')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Permission = require('../model/permissionModel')
const UserPermission = require('../model/categoryModel')

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Error',
                errors: errors.array()
            })
        }

        const { name, email, password, role } = req.body;
        console.log(name, email, password);


        const isExist = await User.findOne({ email });

        if (isExist) {
            return res.status(400).json({
                success: false,
                msg: 'Email alredy exist',
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 0
        })

        const userData = await user.save();

        // asigned default permission

        const defaultPermission = await Permission.find({
            is_default: 1
        })

        if (defaultPermission.length > 0) {
            const permissionArray = []
            defaultPermission.forEach(permission => {
                permissionArray.push({
                    permission_name: permission.permission_name,
                    permission_value: [0, 1, 2, 3]
                })
            })
            const user_permission = new UserPermission({
                user_id: defaultPermission._id,
                permission: permissionArray
            })
            await user_permission.save()
        }


        return res.status(201).json({
            success: true,
            msg: 'Register Successfully',
            data: userData
        })
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })

    }
}


const generateAccessToken = async (user) => {

    // const payload = userData.toObject ? userData.toObject() : userData;
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "2h" })
    return token;
}


const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(200).json({
                success: false,
                msg: 'Error',
                errors: errors.array()
            })
        }

        const { email, password } = req.body
        const userData = await User.findOne({ email });
        if (!userData) {
            res.status(400).json({
                success: false,
                msg: 'email and password is incorrect'
            })
        }
        const ispasswordMatch = await bcrypt.compare(password, userData.password)
        if (!ispasswordMatch) {
            res.status(400).json({
                success: false,
                msg: 'password is incorrect'
            })
        }
        const accessToken = await generateAccessToken({ user: userData });

        return res.status(200).json({
            success: true,
            msg: "Login successfully!",
            tokenType: "Bearer",
            accessToken: accessToken,
            data: userData
        })
    } catch (error) {
        res.status(400).json({
            success: true,
            msg: error.message
        })
    }
}

const getProfile = async (req, res) => {
    try {
        const user_id = req.user_id;
        const userData = await User.findOne({ user_id });

        return res.status(200).json({
            success: true,
            msg: "Profile Data",
            data: userData


        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.massage
        })
    }
}


module.exports = { registerUser, loginUser, getProfile }