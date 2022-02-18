
import {ADD_WatchList,FETCH_WatchList,EDIT_WatchList,UPDATE_WatchList,DELETE_WatchList} from './stockListType';
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
                const wathclists=res.data.results;
               // console.log(categories);
               dispatch(getWatchList(wathclists));
            })
        .catch(err=>console.log(err)); 

    
}
}

export const getWatchList=(wathclists)=>{
    return {
        type:FETCH_WatchList,
        payload:wathclists
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