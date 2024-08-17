const mongoose = require('mongoose')

const permissionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    permissions: [{
        permissions_name: String,
        permissions_value: [Number],
    }]  

})


module.exports = mongoose.model('Permission', permissionSchema);