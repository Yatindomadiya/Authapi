const { validationResult } = require('express-validator')
const Like = require('../model/likeModel')

const postLike = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: true,
                msg: "Validation Error",
                errors: errors.array()
            })
        }
        const { post_id, user_id } = req.body

        const isExist = await Like.findOne({
            post_id,
            user_id
        })

        if (isExist) {
            return res.status(200).json({
                success: true,
                msg: "User alrerdy Liked the post"
            })
        }
        const like = new Like({
            post_id,
            user_id
        })
        const userData = await like.save()

        return res.status(200).json({
            success: true,
            msg: "Post liked",
            data: userData
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}
const postUnLike = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: true,
                msg: "Validation Error",
                errors: errors.array()
            })
        }
        const { post_id, user_id } = req.body

        const isExist = await Like.findOne({
            post_id,
            user_id
        })

        if (!isExist) {
            return res.status(200).json({
                success: true,
                msg: "You have not liked this post"
            })
        }

        await Like.deleteOne({
            post_id,
            user_id
        })

        return res.status(200).json({
            success: true,
            msg: "Post Unliked",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

const postLikeCount = async (req, res) => {
    try {
        const { post_id} = req.body

        const likeCount = await Like.findOne({
            post_id,
        }).countDocuments()

        return res.status(200).json({
            success: true,
            msg: "Post like count",
            count:likeCount
        })

    } catch (error) { 
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}
module.exports = {
    postLike,
    postUnLike,
    postLikeCount
}