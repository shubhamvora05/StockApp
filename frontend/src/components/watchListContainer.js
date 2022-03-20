import React, {useEffect}from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchWatchList,editWatchList,deleteWatchList} from '../Redux/action/stockListAction';
import { Table,Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import fire from '../fire.js';

function GetWatchListContainer(props) {
    const user_id=fire.auth().currentUser.uid;
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchWatchList(user_id))
    });
    const allWatchLists=useSelector(state=>state.allWatchLists); 

//console.log(userDetails);
if(allWatchLists){
    
    var WatchlistData=allWatchLists.map((val,i)=>
        <tr key={i}>
     <td key={val._id}>{i+1}</td>       
    <td>{val._id}</td>
    <td>{val.WatchList}</td>
    <td><Button className="btn btn-primary" onClick={()=>editwatchList(val._id,val.WatchList)}>Edit</Button> 
   <Link to={`/watchlist/${ val._id}`}> <Button className="btn btn-primary"><span>View</span></Button></Link> 
 
    <Button className="btn btn-danger" onClick={()=>deletewatchList(val._id)}>Delete</Button>
    </td>
    </tr>
    )

}else{
    WatchlistData=<tr>
    <td colSpan="4">No Records Found</td>       
   </tr>
}

   const editwatchList=(id,ListName)=>{
    dispatch(editWatchList(id,ListName));
   } 

   const deletewatchList=(id)=>{
       dispatch(deleteWatchList(id));
   }
    //console.log(allCategories);
    return (
        <div>
            <h1 style={{margin: '4% 25%'}}>Your Watchlists </h1>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>WatchList ID </th>
                        <th>WatchList Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        WatchlistData
                    }
                    
                </tbody>
            </Table>
 
        </div>
    )
}
export default GetWatchListContainer;