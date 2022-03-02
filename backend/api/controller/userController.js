var userModel = require('../../models/user');

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