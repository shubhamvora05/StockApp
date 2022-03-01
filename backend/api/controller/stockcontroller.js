var StockModel = require('../../models/add_Stock');
var DefaultStockModel = require('../../models/stocks');


exports.addNewStock=function(req,res,next){
    var watchList=req.body.watchList;
    var stockName=req.body.stockName;
    //console.log(stockName);
    var stockDetails=new StockModel({
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

// get all stock controller
    exports.getAllStock=function(req,res,next){
    
        var watchListId=req.params.watchListId;

    var Stockfind= StockModel.find({WatchList_Id:watchListId});
        Stockfind.exec()
        .then(data=>{                
        res.status(200).json({
            message:"OK",
            results:data,
        });
    })
    .catch(err=>{
        res.json(err);
    })
    }

    // get all default stock controller
    exports.getDefaultStock=function(req,res,next){
    var Stockfind= DefaultStockModel.find();
        Stockfind.exec()
        .then(data=>{                
        res.status(200).json({
            message:"OK",
            results:data,
        });
    })
    .catch(err=>{
        res.json(err);
    })
    }

        // delete stock controller

        exports.deleteStock=function(req,res,next){
            var stock_id=req.body.stock_id;
            //console.log(stock_id);
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