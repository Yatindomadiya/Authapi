const { validationResult } = require('express-validator')
const Category = require('../model/categoryModel')

const addCategory = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: true,
                msg: 'Errors',
                errors: errors.array()
            })
        }
        const { category_name } = req.body;

        const isExists = await Category.findOne({
            name: {
                $regex: category_name,
                $options: 'i'
            }
        });

        if (isExists) {
            return res.status(500).json({
                success: false, 
                msg: "user alredy exists"
            })
        }
        var category = new Category({
            name: category_name
        })

        const categoryData = await category.save()

        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",
            data: categoryData
        })
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            msg: error.message
        })

    }
}
const getCategory = async (req, res) => {
    try {
        const category = await Category.find({})

        return res.status(200).json({
            success: true,
            message: "Get Category Successfully",
            data: category
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })

    }
}
const deleteCategory = async (req, res) => {
    try {
        // Validate request
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation errors',
                errors: errors.array()
            });
        }

        const { id } = req.body;

        // Check if category exists
        const isExist = await Category.findById(id);

        if (!isExist) {
            return res.status(404).json({
                success: false,
                msg: "Category ID does not exist",
            });
        }

        // Delete category
        await Category.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Category successfully deleted",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};
const updateCategory = async (req, res) => {
    try {
        // Validate request
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation errors',
                errors: errors.array()
            });
        }

        const { id, category_name } = req.body;

        // Check if category exists
        const isExist = await Category.findOne({
            _id: { $ne: id },
            name: {
                $regex: category_name,
                $options: 'i'
            }
        });

        if (isExist) {
            return res.status(404).json({
                success: false,
                msg: "Category name alredy exist",
            });
        }

        // Update category
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { $set: { name: category_name } }, // Assuming 'name' is the field to be updated
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Category successfully updated",
            data: updatedCategory
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};


module.exports = {
    addCategory,
    getCategory,
    deleteCategory,
    updateCategory
}