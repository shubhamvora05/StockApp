
import {Add_User,ADD_WatchList,FETCH_WatchList,EDIT_WatchList,UPDATE_WatchList,DELETE_WatchList,DELETE_Stock,ADD_Stock,FETCH_Stock,Get_Default_Stock} from './stockListType';
import fire from '../../fire.js';
const axios = require('axios');


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

export const getWatchList=(watchlists)=>{
    return {
        type:FETCH_WatchList,
        payload:watchlists
    }
}

export const editWatchList=(id,wathclists)=>{
  return {
      type:EDIT_WatchList,
      payload:wathclists,
      id:id
  }
}

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

// ____________________ users actions ________________

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