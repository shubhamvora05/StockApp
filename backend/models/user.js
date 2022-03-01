const mongoose = require('mongoose');

var userSchema =new mongoose.Schema({
    user_Id: {type:Stirng,
        required: true,
        },
    totalAmount: {type: Number, 
        required: true,
        default: 500000
        },
    date:{
        type: Date, 
        default: Date.now }
});

var userModel = mongoose.model('user_details', userSchema);
module.exports=userModel;