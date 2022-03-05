var express = require('express');
var router = express.Router();


const watchListController=require('./controller/watchlistcontroller');
const stockController=require('./controller/stockcontroller');

// get All Category Route
router.get("/", function(req,res,next){
res.send('hello api');
});
router.get("/getwatchList/:userid",watchListController.getWatchlist);

router.get("/getsinglewatchList/:listid",watchListController.getsinglewatchlist);

// Add New watchlist Route
router.post("/add-watchlist",watchListController.addWatchlist);

// update records route
router.patch("/update-watchlist/",watchListController.updateWatchlist);

// delete records route
router.delete("/delete-watchlist/",watchListController.deleteWatchlist);

// add new ticker
router.post("/add-new-stock/",stockController.addNewStock);

// check if stock is available
router.get("/isStock/:stock",stockController.isStock);

// get All avilable stocks
router.get("/getDefaultStock/",stockController.getDefaultStock);

// get All ticker Details Route
router.get("/getAllStocks/:watchListId",stockController.getAllStock);


// delete ticker records route
router.delete("/delete-Stock/",stockController.deleteStock);

// buy stock
router.post("/buy-sotck/",stockController.buyStock);

// sell stokc
router.post("/sell-sotck/",stockController.sellStock);

module.exports=router;