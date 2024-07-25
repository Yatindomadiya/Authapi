const { validationResult } = require('express-validator')

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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

    module.exports = { addPermission }