import React,{useEffect} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { getUserInformation} from '../Redux/action/stockListAction';
import { Table,Container,Row,Col,Form,Button } from 'react-bootstrap';
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
    var user_email =fire.auth().currentUser.email;
    var user_name = fire.auth().currentUser.displayName;

    if(userPortfolioData.length){

        tradableAmount = userPortfolioData[0];

        if(userPortfolioData[1]){
             portfoliostocks=userPortfolioData[1].map((val,i)=>(
                <tr key={i}>
             <td key={val.stock_Id}>{val.stock_Id}</td>       
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
        <Container>
        <div>
            <Row>
            <Header/>
            </Row>
            <Row>
                <Col>
                <h1 style={{margin: '2% 34% '}}>User Profile Details</h1>
                <Table striped bordered hover size="sm" style={{margin: '2% 28% ',width:'40%', backgroundColor:'lightgrey',height: '200px'}}>
                
                <tbody>
                <tr>
                    <td>User name</td>
                    <td>{user_name}</td>
                </tr>
                <tr>
                    <td>User Id</td>
                    <td>{user_id}</td>
                </tr>
                <tr>
                    <td>User email</td>
                    <td>{user_email}</td>
                </tr>
                <tr>
                    <td>Account Balance</td>
                    <td>{tradableAmount}</td>
                </tr>
                </tbody>
            </Table>
                </Col>
                </Row>
                <Row>
                    <Col>
                <h1 style={{margin: '2% 32% '}}>Your Portfolio stocks</h1>
                <Table striped bordered hover size="sm" style={{margin: '2% 27%',width:'44%', backgroundColor:'lightgrey',height: '80px  '}}>
                <thead>
                    <tr>
                        <th>Stock Symbol</th>
                        <th>Total quantity</th>
                        <th>Buy Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {portfoliostocks}
                </tbody>
            </Table>
            </Col>
            </Row>      
        </div>
        </Container>
    )
}
export default UserProfileContainer;