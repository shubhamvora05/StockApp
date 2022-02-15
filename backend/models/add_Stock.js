const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var stockListSchema =new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    WatchList_Id: {type:mongoose.Schema.Types.ObjectId, ref:'Watch_lists',
        required: true,
        },
    stock_ticker: {type:String, 
            required: true,
           },
    date:{
        type: Date, 
        default: Date.now }
});
stockListSchema.plugin(mongoosePaginate);
var StockModel = mongoose.model('Stock_lists', stockListSchema);
module.exports=StockModel;