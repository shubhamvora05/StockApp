var StockModel = require('../../models/add_Stock');
const mongoose = require('mongoose');


exports.addNewStock=function(req,res,next){
    var watchList=req.body.watchList;
    var stockName=req.body.stockName;
    
    var stockDetails=new StockModel({
        _id:mongoose.Types.ObjectId(),
        WatchList_Id:watchList,
        stock_ticker:stockName
      });

      stockDetails.save()
    .then(doc=>{
        res.status(201).json({
            message:"Stock Inserted Successfully",
            results:doc
        });
    })
    .catch(err=>{
        res.json(err);
    });
    }

// get all password controller
    exports.getAllStock=function(req,res,next){
    
        var watchListId=req.params.watchListId;
    var StockModel= StockModel.find({WatchList_Id:watchListId});
        StockModel
        .exec()
        .select("WatchList_Id stock_ticker")
        .populate("WatchList_Id", "stock_ticker")
        .exec()
    .then(data=>{
        res.status(200).json({
            message:"OK",
            results:data
        });
    })
    .catch(err=>{
        res.json(err);
    })
    }

        // delete password controller

        exports.deleteStock=function(req,res,next){
            var stock_id=req.body.stock_id;
            StockModel.findByIdAndRemove(stock_id)
              .then(doc=>{
               res.status(201).json({
                   message:"Stock Deleted Successfully",
                   results:doc
               });
              })
              .catch(err=>{
                  res.json(err)
              })
           
           }