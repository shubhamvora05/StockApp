
import {STOCK_CHART,get_user_details,BUY_STOCK,SELL_STOCK,Get_Stock_Data,Add_User,ADD_WatchList,FETCH_WatchList,EDIT_WatchList,UPDATE_WatchList,DELETE_WatchList,DELETE_Stock,ADD_Stock,FETCH_Stock,Get_Default_Stock} from './stockListType';
import fire from '../../fire.js';
const axios = require('axios');

// action to add watchlist

export const addWatchList=(watchlist,user_id)=>{
    var OPTIONS = {
        url: "http://localhost:5000/add-watchlist",
        method: "POST",
        data:{watchListName:watchlist,user_id:user_id},
        headers: {
          "content-type": "application/json",
        },
      }

    axios(OPTIONS).then(res=>console.log(res)).catch(err=>console.log(err));
    return{
        type:ADD_WatchList,
        payload:watchlist
    }
}

// action to fetch single watchlist to show its details

export const fetchSingleWatchList = (watchlist_id)=>{
  return function(dispatch){
      
    var OPTIONS = {
        url: "http://localhost:5000/getsinglewatchList/"+watchlist_id,
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }

    axios(OPTIONS)
    .then(res=>
        {
          const watchlist=res.data.results;
           dispatch(getWatchList(watchlist));
        })
    .catch(err=>console.log(err));     
}

}


// action to feacth all watchlists

export const fetchWatchList=(user_id)=>{
  
    return function(dispatch){
      
        var OPTIONS = {
            url: "http://localhost:5000/getwatchList/"+user_id,
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
    
        axios(OPTIONS)
        .then(res=>
            {
              const watchlists=res.data.results;
               dispatch(getWatchList(watchlists));
            })
        .catch(err=>console.log(err));     
}
}

// to get all watchlist
export const getWatchList=(watchlists)=>{
    return {
        type:FETCH_WatchList,
        payload:watchlists
    }
}

// to edit watchlist
export const editWatchList=(id,wathclists)=>{
  return {
      type:EDIT_WatchList,
      payload:wathclists,
      id:id
  }
}

// to update watchlists
export const updateWatchList=(id,wathclist)=>{
  var OPTIONS = {
    url: "http://localhost:5000/update-watchlist",
    method: "PATCH",
    data:{_id:id,watchListName:wathclist},
    headers: {
      "content-type": "application/json",
    },
  }

axios(OPTIONS).then(res=>console.log(res)).catch(err=>console.log(err));

  return {
      type:UPDATE_WatchList,
      payload:wathclist,
  }
}

// to delete watchlist
export const deleteWatchList=(id)=>{
  var OPTIONS = {
    url: "http://localhost:5000/delete-watchlist",
    method: "DELETE",
    data:{watchlist_id:id},
    headers: {
      "content-type": "application/json",
    },
  }

axios(OPTIONS).then(res=>console.log(res)).catch(err=>console.log(err));

  return {
      type:DELETE_WatchList,
      payload:id,
  }
}


//   -----------------------------------    actions for stock ------------------------------

// to get all default stocks
export const getDefaultStocks=()=>{
  return function(dispatch){
    
    var OPTIONS = {
        url: "http://localhost:5000/getDefaultStock",
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }

    axios(OPTIONS)
    .then(res=>
        {
          //console.log(res.data.results);
          const defaultStocks=res.data.results;
           dispatch(getDefaultstock(defaultStocks));
        })
    .catch(err=>console.log(err)); 
}
}

export const getDefaultstock=(defaultStocks)=>{
  return {
      type:Get_Default_Stock,
      payload:defaultStocks
  }
}

// to get stock data using API

export const getStockData = (stockSymbol) =>{
  return function(dispatch){
  var OPTIONS = {
    url: "http://localhost:5000/isStock/"+stockSymbol,
    method: "GET",
    data:{},
    headers: {
      "content-type": "application/json",
    },
  }
  
  axios(OPTIONS).then(res=> {
    if(res.data.results.length){
      var OPTIONS = {
        url: "https://cloud.iexapis.com/stable/stock/"+res.data.results[0].tickerSymbol+"/previous?token=pk_949aee3bea8c4d1f92fee3b89e3e00f7",
        method: "GET",
        data:{},
        headers: {
          "content-type": "application/json",
        },
      }
      axios(OPTIONS).then(res=> {
        dispatch(getStockDataFromAPI(res.data));
      })
    }
})
    .catch(err=>console.log(err));
  }
}

export const getStockDataFromAPI = (stockData) =>{
  var stockDataList = [];
  stockDataList[0]=stockData;
  return {
    type:Get_Stock_Data,
    payload:stockDataList,
} 
}

// to add stock in particular watchlists

export const addStock=(watchlist,stock)=>{
  //console.log(stock);
  var OPTIONS = {
      url: "http://localhost:5000/add-new-stock",
      method: "POST",
      data:{watchList:watchlist,stockName:stock},
      headers: {
        "content-type": "application/json",
      },
    }

  axios(OPTIONS).then(res=>console.log(res)).catch(err=>console.log(err));
  return{
      type:ADD_Stock,
      payload:stock
  }
}

// to get all stock of particular watchlist
export const fetchStock=(watchlist_id)=>{
   
  return function(dispatch){
    
      var OPTIONS = {
          url: "http://localhost:5000/getAllStocks/"+watchlist_id,
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
  
      axios(OPTIONS)
      .then(res=>
          {
            const stocks=res.data.results;
         //   const CurrentWatchList = res.data.WatchList_Name;
             dispatch(getstock(stocks));
          })
      .catch(err=>console.log(err)); 
}
}

export const getstock=(stocks)=>{
  return {
      type:FETCH_Stock,
      payload:stocks
    //  payload:{stocks,CurrentWatchList}
      //payload:stocks
  }
}

// to delete stock
export const deleteStock=(id)=>{
var OPTIONS = {
  url: "http://localhost:5000/delete-Stock/",
  method: "DELETE",
  data:{stock_id:id},
  headers: {
    "content-type": "application/json",
  },
}

axios(OPTIONS).then(res=>console.log(res)).catch(err=>console.log(err));

return {
    type:DELETE_Stock,
    payload:id,
}
}

// to buy stock
export const buyCurrentStock=(stock_id,user_id,buy_price,total_quantity)=>{
  return function(dispatch){
  var OPTIONS = {
    url: "http://localhost:5000/buy-stock/",
    method: "POST",
    data:{stock_id:stock_id,user_Id:user_id,Buy_price:buy_price,Total_quantity:total_quantity},
    headers: {
      "content-type": "application/json",
    },
  }
  
  axios(OPTIONS).then(res=>
    {
      const buyStockData = [];
      buyStockData[0]=res.data.message;
      buyStockData[1]=res.data.BuyPrice;
      buyStockData[2]=res.data.totalAmountUsed;
      buyStockData[3]=res.data.TradableAmount;
       dispatch(buyStock(buyStockData));
    }).catch(err=>console.log(err));
} 
}

export const buyStock=(buyStockData)=>{
return {
  type:BUY_STOCK,
  payload:buyStockData,
}
}

// to sell stock
export const sellCurrentStock=(stock_id,user_id,sell_price,total_quantity)=>{
  return function(dispatch){
  var OPTIONS = {
    url: "http://localhost:5000/sell-stock/",
    method: "POST",
    data:{stock_id:stock_id,user_Id:user_id,Sell_price:sell_price,Sell_quantity:total_quantity},
    headers: {
      "content-type": "application/json",
    },
  }
  
  axios(OPTIONS).then(res=> {
    const sellStockData = [];
    sellStockData[0]=res.data.message;
    sellStockData[1]=res.data.sell_price;
    sellStockData[2]=res.data.ReleasedAmount;
    sellStockData[3]=res.data.AvailableQuantity;

    dispatch(sellStock(sellStockData));
  }).catch(err=>console.log(err));
}
}

export const sellStock=(sellStockData)=>{
  return {
    type:SELL_STOCK,
    payload:sellStockData,
  }
  }

// to get stock chart data
export const getStockChartData = (stockSymbol) =>{
  return function(dispatch){
      var OPTIONS = {
        url: "https://cloud.iexapis.com/stable/stock/"+stockSymbol+"/chart/1y?token=pk_285cb48c447f42ee90eb212c9e6e5a09",
        method: "GET",
        data:{},
        headers: {
          "content-type": "application/json",
        },
      }
      axios(OPTIONS).then(res=> {
        console.log(res.data);
        dispatch(getStockDataFromAPI(res.data));
      })
    .catch(err=>console.log(err));
  }
}

export const getStockChartDataFromAPI = (stockChartData) =>{
  return {
    type:Get_Stock_Data,
    payload:stockChartData,
} 
}

// ____________________ users actions ________________

// to add user in database
export const addUser=(user_id)=>{
    var OPTIONS = {
        url: "http://localhost:5000/user/add-user",
        method: "POST",
        data:{user_id:fire.auth().currentUser.uid},
        headers: {
          "content-type": "application/json",
        },
      }
    axios(OPTIONS).then(res=>console.log(res)).catch(err=>console.log(err));

    return{
        type:Add_User,
        payload:fire.auth().currentUser.uid,
    }
}

// to get user portfolio details

export const getUserInformation=(user_id)=>{
  return function(dispatch){
  var OPTIONS = {
      url: "http://localhost:5000/user/get-user-details/"+user_id,
      method: "GET",
      data:{user_id:user_id},
      headers: {
        "content-type": "application/json",
      },
    }
  axios(OPTIONS)
  .then(res=>{
       var currentUserData = [];
       currentUserData[0] = res.data.tradableAmount;
       currentUserData[1] = res.data.portfolioStocks;
       dispatch(userInfo(currentUserData));
  })
  .catch(err=>console.log(err));
}
}

export const userInfo=(userData)=>{
return{
  type:get_user_details,
  payload:userData,
}
}