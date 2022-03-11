var userModel = require('../../models/user');
var StockOrderModel = require('../../models/stock_orders');

const mongoose = require('mongoose');
  
  
  // add user controller

exports.addUser=function(req,res,next){
      
    var user_id=req.body.user_id;
    var userDetails=new userModel({user_Id:user_id});
    userDetails.save()
    .then(doc=>{
        res.json({
            message:"User saved Successfully",
            results:doc
        });
    })
    .catch(err=>{
        res.json(err);
    });
            
}

exports.userInformation=function(req,res,next){
    
    var user_id=req.params.user_id;
    var userDetails=userModel.find({user_Id:user_id});
    userDetails.exec()
    .then(data=>{
        var tradableAmount=0;
        if(data.length){
            tradableAmount= data[0].totalAmount
        }
        var getstockorderdata = StockOrderModel.find({user_Id:user_id})
        getstockorderdata.exec()
        .then(orderdata=>{
            res.json({
                tradableAmount:tradableAmount,
                portfolioStocks:orderdata
            })
        })
    })
    .catch(err=>{
        res.json(err);
    })

}