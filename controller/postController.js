const { validationResult } = require('express-validator')
const Post = require('../model/postModel')


const createPost = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation errors',
                errors: errors.array()
            });
        }
        const { title, description } = req.body

        var obj = {
            title,
            description
        }

        if (req.body.categories) {
            obj.categories = req.body.categories;
        }
        const post = new Post(obj);

        const postData = await post.save();

        const postfullData = await Post.findOne({ _id: postData._id }).populate('categories')

        return res.status(200).json({
            success: true,
            msg: "post created sucessfully",
            data: postfullData
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}



const getPost = async (req, res) => {
    try {

        const getData = await Post.find({}).populate('categories')
        return res.status(200).json({
            success: true,
            msg: "get postdata sucessfully",
            data: getData
        })

 
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation errors',
                errors: errors.array()
            });
        }

        const { id } = req.body

        const checkIdValid = await Post.findById({ _id: id })

        if (checkIdValid) {
            await Post.findByIdAndDelete({ _id: id })
        }

        return res.status(200).json({
            success: true,
            msg: "post deleted sucessfully",
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}
const updatePost = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation errors',
                errors: errors.array()
            });
        }

        const { id, title, description } = req.body

        const isExist = await Post.findById({ _id: id })

        if (!isExist) {
            return res.status(500).json({
                success: false,
                msg: "post doesn't exist"
            })
        }

        var obj = {
            title,
            description 
        }

        if (req.body.categories) {
            obj.categories = req.body.categories
        }

        const updatedData = await Post.findByIdAndUpdate({ _id: id },
            { $set: obj },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            msg: "updated postdata sucessfully",
            data: updatedData
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Post does dot exist"
        })
    }
}
module.exports = { createPost, getPost, deletePost, updatePost }