const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var stockOrderSchema =new mongoose.Schema({
    user_Id: {type:String,
        required: true,
        },
    stock_Id: {type:String,
        required: true,
    },
    Total_quantity: {type: Number, 
        required: true,
           },
    Buy_price: {type: Number, 
        required: true,
    },
    date:{
        type: Date, 
        default: Date.now }
});

var StockOrderModel = mongoose.model('Stock_order', stockOrderSchema);
module.exports=StockOrderModel;