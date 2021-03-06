var StockModel = require('../../models/add_Stock');
var DefaultStockModel = require('../../models/stocks');
var StockOrderModel = require('../../models/stock_orders');
var userModel =require('../../models/user');

exports.addNewStock=function(req,res,next){
    var watchList=req.body.watchList;
    var stockName=req.body.stockName;
    //console.log(stockName);
    var stockDetails=new StockModel({
        WatchList_Id:watchList,
        stock_ticker:stockName
      });
    // console.log("yes");
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

// check if stock is available or not
exports.isStock=function(req,res,next){

    var stock = req.params.stock;
    var Stockfind= DefaultStockModel.find({tickerSymbol:stock});
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

    // buy stock
exports.buyStock = function(req,res,next){
    
  var stock_Id = req.body.stock_id;
  var user_Id = req.body.user_Id;
  var Buy_price = parseInt(req.body.Buy_price);
  var Total_quantity = parseInt(req.body.Total_quantity);
  var AvailableData;
  var previousBuyPrice;
  var previousQuantity;
 

  var usermodel = userModel.find({user_Id:user_Id});
      usermodel.exec()
      .then(data=>{

       if(!data.length){
        res.json({
            message:"Please! sign in or sign up.",
        });
       }else if(data[0].totalAmount>=Total_quantity*Buy_price){

        var getstockorder = StockOrderModel.find({stock_Id:stock_Id, user_Id:user_Id})
        getstockorder.exec()
        .then(data=>{
            if(data.length){
    
            AvailableData = data[0]._id;
            previousBuyPrice = parseInt(data[0].Buy_price);
            previousQuantity = parseInt(data[0].Total_quantity);
    
            StockOrderModel.findById(AvailableData,function(err,dataToUpdate){
                dataToUpdate.Total_quantity=previousQuantity + Total_quantity;
                dataToUpdate.Buy_price=(Total_quantity*Buy_price + previousQuantity*previousBuyPrice)/(previousQuantity + Total_quantity );
                dataToUpdate.save()
            })
            }else{
    
            var buynewstock=new StockOrderModel({
                    stock_Id:stock_Id, 
                    user_Id:user_Id,
                    Total_quantity:Total_quantity,
                    Buy_price:Buy_price
                  });
            
                  buynewstock.save()
            }
        })

      
       userModel.findById(data[0]._id,function(err,data){
            data.totalAmount-=Total_quantity*Buy_price;
            data.save()
            .then(doc=>{
                res.json({
                    message:"Stock Bought Successfully",
                    BuyPrice: Buy_price,
                    totalAmountUsed:Total_quantity*Buy_price
                });
             })
           }) 

       }else{
         res.json({
             message:"You don't have enough fund.",
             TradableAmount:data[0].totalAmount
        });
       }
      }) 
      .catch(err=>{
          console.log(err);
          res.json(err);
      })
}

    // sell stock
exports.sellStock = function(req,res,next){

    var stock_Id = req.body.stock_id;
    var user_Id = req.body.user_Id;
    var sell_price = parseInt(req.body.Sell_price);
    var sell_quantity = parseInt(req.body.Sell_quantity);
    var AvailableData;
    var Total_Quantity;   
  
    var usermodel = userModel.find({user_Id:user_Id});
        usermodel.exec()
        .then(data=>{
          if(data.length){
            var userid = data[0]._id;
          var getstockorder = StockOrderModel.find({stock_Id:stock_Id, user_Id:user_Id})
          getstockorder.exec()
          .then(data=>{

            if(!data.length){

                res.json({
                    message:"you don't have enough quantity to sell it.",
                    AvailableQuantity:0
                });

            }else if(data[0].Total_quantity>sell_quantity){

                AvailableData = data[0]._id;
                Total_Quantity = parseInt(data[0].Total_quantity);
      
                StockOrderModel.findById(AvailableData,function(err,data){
                  data.Total_quantity=Total_Quantity-sell_quantity;
                  data.save()
              })

              userModel.findById(userid,function(err,data){
                data.totalAmount+=sell_quantity*sell_price;
                data.save()
                .then(doc=>{
                    res.json({
                        message:"Stock sold Successfully",
                        sell_price:sell_price,
                        ReleasedAmount:sell_quantity*sell_price
                    });
                 })
               }) 
               
            }else if(data[0].Total_quantity=sell_quantity){

                AvailableData = data[0]._id;
                Total_Quantity = parseInt(data[0].Total_quantity);
      
                StockOrderModel.findByIdAndRemove(AvailableData)
                .then(doc=>{
                 res.status(201).json({
                    message:"Stock sold Successfully",
                        sell_price:sell_price,
                        ReleasedAmount:sell_quantity*sell_price
                 });
                })
                .catch(err=>{
                    res.json(err)
                })

            }else{

                res.json({
                    message:"you don't have enough quantity to sell it.",
                    AvailableQuantity:data[0].Total_quantity
                });
              
            }   
          })
        }else{
            res.json("user is invalid!")
        }
        }) 
        .catch(err=>{
            console.log(err);
            res.json(err);
        })
}