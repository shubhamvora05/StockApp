const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
const mongoose = require('mongoose');
const {IEXCloudClient}  = require("node-iex-cloud");
const fetch = require("node-fetch");
var WatchListAPI = require('./api/watchlist');
var stock = require('./models/stocks')


 
mongoose.connect( 
  'mongodb+srv://shubhamvora05:Stockdata@stockdata.lrlgm.mongodb.net/StockList?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to database');
})
.catch((err) => {
  console.log('Error connecting to DB', err.message);
});

app.use('/',WatchListAPI);

// TO add stocks into the database

// var stockAdd=new stock({
//   tickerSymbol:'BAC',
// });

// stockAdd.save()
//     .then(res=>{
//        console.log("stock added");
//     })
//     .catch(err=>{
//         console.log(err);
//     });


// const iex = new IEXCloudClient(fetch, {
//   //sandbox: true,
//   publishable: "pk_285cb48c447f42ee90eb212c9e6e5a09",
//   version: "v1"
// });

// iex
//   .crypto("ETHUSD")
//   .quote()
//   .then(res => console.log(res));

//https://cloud.iexapis.com/stable/stock/aapl/balance-sheet?period=annual

// fetch("https://cloud.iexapis.com/stable/stockaapl/balance-sheet?period=annual?token=pk_285cb48c447f42ee90eb212c9e6e5a09")
// .then(res => res.text())
// .then(text => console.log(text));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});