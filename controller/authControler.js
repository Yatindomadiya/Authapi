const User = require('../model/userModel')
const { validationResult } = require('express-validator')
const jwt =require('jsonwebtoken')
const bcrypt=require('bcrypt')

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

        const { name, email, password } = req.body;
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
            password: hashedPassword
        })

        const userData = await user.save();

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


const generateAccessToken = async (userData) => {

    const payload = userData.toObject ? userData.toObject() : userData;
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2h" })
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
        const ispasswordMatch = bcrypt.compare(password, userData.password)
        if (!ispasswordMatch) {
            res.status(400).json({
                success: false,
                msg: 'email and password is incorrect'
            })
        }
        const accessToken = await generateAccessToken(userData);

        return res.status(200).json({
            success: true,
            msg: "Login successfully!",
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


module.exports = { registerUser, loginUser }