import React,{useEffect} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { getUserInformation} from '../Redux/action/stockListAction';
import { Table,Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import Header from './Header';
import fire from '../fire.js';


function UserProfileContainer(props) {
   
    const dispatch = useDispatch();
    const user_id = fire.auth().currentUser.uid;
    useEffect(()=>{
        dispatch(getUserInformation(user_id));
    });
    const userPortfolioData=useSelector(state=>state.userPortfolioData);
    
    var portfoliostocks = [];
    var tradableAmount = 0;
    if(userPortfolioData.length){

        tradableAmount = userPortfolioData[0];

        if(userPortfolioData[1]){
             portfoliostocks=userPortfolioData[1].map((val,i)=>(
                <tr key={i}>
             <td key={val.stock_Id}>{i+1}</td>       
            <td>{val.Total_quantity}</td>
            <td>{val.Buy_price}</td>
            <td><Link to={`/stock/${ val.stock_Id}`}> <Button className="btn btn-primary"><span>View</span></Button></Link></td>
            </tr>
            ))
        
        }else{
            portfoliostocks = <tr>
            <td colSpan="4">No Stocks Found in your portfolio.</td>       
           </tr>
        }
        

    }
   
    return (
        
        <div>
            <Header/>
            <h1>Balance:{tradableAmount}</h1>
             {portfoliostocks}
        </div>
    )
}
export default UserProfileContainer;