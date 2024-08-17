const bcrypt = require('bcrypt');
const User = require('../model/userModel')
const { validationResult } = require('express-validator')
const randomstring = require("randomstring");
const { sendMail } = require('../helper/mailer')


const createUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: true,
                msg: "Validation error",
                errors: errors.array()
            })
        }
        const { name, email } = req.body
        const isExist = await User.findOne({ email })

        if (isExist) {
            return res.status(400).json({
                success: true,
                msg: "Email alredy exist"
            })
        }
        const password = randomstring.generate(6)
        const hashPassword = await bcrypt.hash(password, 10)

        var obj = {
            email,
            name,
            password: hashPassword
        }
        if (req.body.role == 1) {
            return res.status(400).json({
                success: false,
                msg: "You can not create Admin"
            })
        }
        else if (req.body.role) {
            obj.role = req.body.role;
        }

        const user = new User(obj)
        const userData = await user.save()

        console.log(password);

        const content = `
            <p> Hii <b>`+ userData.name + `</b> Your account is created,below is detail</p>
            <table style="border-style:none;">
              <tr>
                <th>Name:</th>
                <td>`+ userData.name + `</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>`+ userData.email + `</td>
              </tr>
              <tr>
                <th>Password:</th>
                <td>`+ password + `</td>
              </tr>
            </table>
            <p>now,you can login your account in application,detail is below</p>
        `
        sendMail(userData.email, "Account created", content)

        return res.status(200).json({
            success: true,
            msg: "User Created Successfully",
            data: userData
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

const getUser = async (req, res) => {
    try {

        const users = await User.find({
            _id: {
                $ne: req.user._id
            }
        })

        res.status(200).json({
            success: true,
            msg: "User fetched Successfully",
            data: users
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
const updateUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(200).json({
                success: false,
                msg: "Error",
                errors: errors.array()
            })
        }

        const { id, name, email } = req.body

        const isExist = await User.findById({ _id: id })

        if (!isExist) {
            res.status(400).json({
                success: false,
                msg: "User not Exists"
            })
        }

        var obj = {
            name, email
        }

        if (req.body.role != undefined) {
            obj.role = req.body.role
        }

        const UpdatedData = await User.findByIdAndUpdate({ _id: id }, { $set: obj }, { new: true })

        res.status(200).json({
            success: true,
            msg: "User fetched Successfully",
            data: UpdatedData
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}
const deleteUser = async (req, res) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(400).json({
                success: true,
                msg: "Validation error",
                errors: errors.array()
            })
        }

        const { id } = req.body
        const isExist = await User.find({ _id: id })

        if (!isExist) {
            res.status(400).json({
                success: false,
                msg: "User is not exist",
            })
        }
        await User.findByIdAndDelete({ _id: id })

        res.status(200).json({
            success: true,
            msg: "User Deleted Successfully",
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}