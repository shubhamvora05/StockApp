import { Get_Stock_Data,Add_User,ADD_WatchList,FETCH_WatchList,EDIT_WatchList,UPDATE_WatchList,DELETE_WatchList,ADD_Stock,FETCH_Stock,DELETE_Stock,Get_Default_Stock} from '../action/stockListType';
const initialState={
    watchList:'',
    allWatchLists:[],
    action:'Add',
    id:'',
    msg:'',
    Stock:'',
    allStocks:[],
    defaultStocks:[],
    stockData:[]
}

const stockListReducer=(state=initialState, action)=>{

    switch(action.type){
        case ADD_WatchList:return{
            ...state,
            watchList:action.payload,
            msg:"WatchList added Successfully"
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
            action:'Add',
            msg:"WatchList Updated Successfully"
          
        }
        case DELETE_WatchList:return{
            ...state,
            action:'Add',
            msg:"WatchList Deleted Successfully"
          
        }
        case Get_Default_Stock:return{
            ...state,
            defaultStocks:action.payload
        }
        case  Get_Stock_Data:return{
            ...state,
            stockData:action.payload
        }
        case ADD_Stock:return{
            ...state,
            Stock:action.payload,
            msg:"Stock Inserted Successfully"
        }
        case FETCH_Stock:return{
            ...state,
            allStocks:action.payload
            //allStocks:action.payload["stocks"],
           // watchList:action.payload["CurrentWatchList"]
        }
        case DELETE_Stock:return{
            ...state,
            msg:"Stock Deleted Successfully"
          
        }
        case Add_User:return{
            ...state
        }
        default:return state;
    }
}

export default stockListReducer;