import {ADD_WatchList,FETCH_WatchList,EDIT_WatchList,UPDATE_WatchList,DELETE_WatchList} from '../action/stockListType';
const initialState={
    watchList:'',
    allWatchLists:[],
    action:'Add',
    id:'',
    msg:''
}

const passReducer=(state=initialState, action)=>{

    switch(action.type){
        case ADD_WatchList:return{
            ...state,
            watchList:action.payload
        }
        case FETCH_WatchList:return{
            ...state,
            allWatchLists:action.payload
        }
        case EDIT_WatchList:return{
            ...state,
            watchList:action.payload,
            id:action.id,
            action:'Edit'
        }
        case UPDATE_WatchList:return{
            ...state,
            watchList:action.payload,
            msg:"WatchList Updated Successfully"
          
        }
        case DELETE_WatchList:return{
            ...state,
            action:'Add',
            msg:"WatchList Deleted Successfully"
          
        }
        default:return state;
    }
}

export default passReducer;