var watchListModel = require('../../models/stock_watchlist');

const mongoose = require('mongoose');


exports.getWatchlist=function(req,res,next){

    var id=req.params.userid;
    var getwatchlist= watchListModel.find({user_id:id},{'Watch_lists':1,'_id':1});
    getwatchlist.exec()
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

    // add category controller

    exports.addWatchlist=function(req,res,next){
       
        var watchListName=req.body.watchListName;
        var user_id=req.body.user_id;

        var watchListDetails=new watchListModel({WatchList:watchListName,user_id:user_id});
        watchListDetails.save()
        .then(doc=>{
            res.status(201).json({
                message:"Watchlist created Successfully",
                results:doc
            });
        })
        .catch(err=>{
            res.json(err);
        });
                
        }


        // update category controller
        exports.updateWatchlist=function(req,res,next){

            var id=req.body._id;
            var watchListName=req.body.watchListName;
            watchListModel.findById(id,function(err,data){
         
              data.WatchList=watchListName?watchListName:data.WatchList;
             
                data.save()
                  .then(doc=>{
                     res.status(201).json({
                         message:"WatchList Updated Successfully",
                         results:doc
                     });
                  })
                  .catch(err=>{
                      res.json(err);
                  })
                 
             });
         
         }

         // delete category controller
         exports.deleteWatchlist=function(req,res,next){
            var watchL_id=req.body.watchlist_id;
            watchListModel.findByIdAndRemove(watchL_id)
              .then(doc=>{
               res.status(201).json({
                   message:"WatchList Deleted Successfully",
                   results:doc
               });
              })
              .catch(err=>{
                  res.json(err)
              })
           
           }