const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var stockOrderSchema =new mongoose.Schema({
    user_Id: {type:mongoose.Schema.Types.ObjectId, ref:'user_details',
        required: true,
        },
    stock_Id: {type:mongoose.Schema.Types.ObjectId, ref:'Stocks',
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
stockOrderchema.plugin(mongoosePaginate);
var StockOrderModel = mongoose.model('Stock_order', stockOrderSchema);
module.exports=StockOrderModel;