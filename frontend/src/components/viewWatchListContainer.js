import React,{useEffect} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { fetchStock, deleteStock} from '../Redux/action/stockListAction';
import { Table,Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';


function ViewWatchListContainer(props) {
   
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchStock(props.id))
    });
    const allStocks=useSelector(state=>state.allStocks);

if(allStocks){
    var stockList=allStocks.map((val,i)=>(
        <tr key={i}>
     <td key={val._id}>{i+1}</td>       
    <td>{val._id}</td>
    <td>{val.stock_ticker}</td>
    <td><Link to={`/stock/${ val.stock_ticker}`}> <Button className="btn btn-primary"><span>View</span></Button></Link> 
    <Button className="btn btn-danger" onClick={()=>deleteStk(val._id)}>Delete</Button></td>
    </tr>
    ))

}else{
    stockList=<tr>
    <td colSpan="4">No Records Found</td>       
   </tr>
}

   

   const deleteStk=(id)=>{
       dispatch(deleteStock(id));
   }
   
    return (
        
        <div>
            <h1>all stocks</h1>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Stock ID </th>
                        <th>Ticker Symbol</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stockList
                    }
                    
                </tbody>
            </Table>
 
        </div>
    )
}
export default ViewWatchListContainer;