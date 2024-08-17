const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware')
const { categoryAddValidator, categoryDeleteValidator, categoryUpdateValidator, createPostValidator, updatePostValidator, deletePostValidator } = require('../helper/adminValidator')
const { createUserValidator, updateUserValidator, deleteUserValidator, LikeUnlikeValidator} = require('../helper/validator')
const categoryController = require('../controller/categoryControll')
const postController = require('../controller/postController')
const userController = require('../controller/userController')
const likeController = require('../controller/likeController')

//category route
router.post('/add-category', auth, categoryAddValidator, categoryController.addCategory)
router.get('/get-Category', auth, categoryController.getCategory)
router.post('/delete-category', auth, categoryDeleteValidator, categoryController.deleteCategory)
router.post('/update-category', auth, categoryUpdateValidator, categoryController.updateCategory)

//post route
router.post('/create-post', auth, createPostValidator, postController.createPost)
router.get('/get-post', auth, postController.getPost)
router.post('/update-post', auth, updatePostValidator, postController.updatePost)
router.post('/delete-post', auth, deletePostValidator, postController.deletePost)

//user route
router.post('/create-user', auth, createUserValidator, userController.createUser)
router.get('/get-users', auth, userController.getUser)
router.post('/update-user', auth, updateUserValidator, userController.updateUser)
router.post('/delete-user', auth, deleteUserValidator, userController.deleteUser)

//like and unlike Routes

router.post('/like-post', auth, LikeUnlikeValidator, likeController.postLike)
router.post('/unlike-post', auth, LikeUnlikeValidator, likeController.postUnLike)
router.post('/post-like-count', auth, likeController.postLikeCount)


module.exports = router 