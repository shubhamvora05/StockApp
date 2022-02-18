const mongoose = require('mongoose');
var dotenv = require('dotenv');

var WatchListSchema =new mongoose.Schema({
    WatchList: {type:String, 
        required: true,
        },
  user_id:{
      type:String,
      required:true
  },
    date:{
        type: Date, 
        default: Date.now }
});

var WatchListeModel = mongoose.model('Watch_lists', WatchListSchema);
module.exports=WatchListeModel;