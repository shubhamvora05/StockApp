const mongoose = require('mongoose');

var stockSchema =new mongoose.Schema({
    tickerSymbol: {type:String, 
        required: true,
        },
    date:{
        type: Date, 
        default: Date.now }
});

var stockModel = mongoose.model('Stocks', stockSchema);
module.exports=stockModel;