var express = require('express');
var router = express.Router();


const watchListController=require('./controller/watchlistcontroller');
const stockController=require('./controller/stockcontroller');

// get All Category Route
router.get("/", function(req,res,next){
res.send('hello api');
});
router.get("/getwatchList/:userid",watchListController.getWatchlist);

// Add New watchlist Route
router.post("/add-watchlist",watchListController.addWatchlist);

// update records route
router.patch("/update-watchlist/",watchListController.updateWatchlist);

// delete records route
router.delete("/delete-watchlist/",watchListController.deleteWatchlist);

// add new ticker
router.post("/add-new-stock/",stockController.addNewStock);

// get All ticker Details Route
router.get("/getAllStocks/",stockController.getAllStock);


// delete ticker records route
router.delete("/delete-Stock/",stockController.deleteStock);

module.exports=router;