var express = require('express');
var router = express.Router();


const userController=require('./controller/userController');


// get All Category Route
router.get("/", function(req,res,next){
res.send('hello user');
});

// Add New watchlist Route
router.post("/add-user",userController.addUser);


module.exports=router;