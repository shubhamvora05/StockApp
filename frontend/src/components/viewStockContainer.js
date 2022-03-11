import React,{ useState, useEffect} from 'react'
import {connect} from 'react-redux';
import { getStockData,buyCurrentStock,sellCurrentStock } from '../Redux/action/stockListAction';
import {useSelector, useDispatch} from 'react-redux';
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import Header from './Header';
import fire from '../fire.js';

function ViewStockContainer(props) {

    let { id } = useParams();
    const dispatch=useDispatch();
    useEffect(()=>{
        const timer = setTimeout(() => {
            dispatch(getStockData(id));
          }, 60000);
     
    });
    const stockdata=useSelector(state=>state.stockData);
    var buy_price=100;
    var sell_price=100;
    if(stockdata.length){
        var StockData=stockdata[0].close;
         buy_price = stockdata[0].close;
         sell_price = stockdata[0].close;
      }
      const [total_quantity, settotal_quantity] =useState(10);

    const user_id=fire.auth().currentUser.uid;
    

    return (
        <Container>
            <Header/>
            <Row>
                <h1>stock {id}</h1>
                {StockData}
            </Row>
            <Row>
                <Form className="form">     
                    <p>{props.buystockData[0]}</p>
                    <p>{props.buystockData[1]}</p>
                    <p>{props.buystockData[2]}</p>
                    <p>{props.buystockData[3]}</p>
                    <p>{props.sellstockData[0]}</p>
                    
                    <p>Your stock will be Bought / sold at current stock price.</p>
                    <Form.Group controlId="formCategory">
                    <Form.Label>Enter quantity to Buy / Sell stock</Form.Label>
                    <Form.Control type="text" defaultValue={props.total_quantity} onChange={e=>settotal_quantity(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" onClick={()=>props.buyStock(id,user_id,buy_price,total_quantity)}>Buy {id}</Button>
                    <Button variant="primary" onClick={()=>props.sellStock(id,user_id,sell_price,total_quantity)}>Sell {id}</Button>
                </Form>
            </Row>
        </Container>
    )
}

const mapStatetoProps=(state)=>{
    return{
        buystockData:state.stockbuyData,
        sellstockData:state.stocksellData
    }
   }
   
   const mapDispatchtoProps=(dispatch)=>{
    return{
        buyStock:function(id,user_id,buy_price,total_quantity){
           dispatch(buyCurrentStock(id,user_id,buy_price,total_quantity));
       },
       sellStock:function(id,user_id,sell_price,total_quantity){
           dispatch(sellCurrentStock(id,user_id,sell_price,total_quantity));
       }  
    }
   }

export default connect(mapStatetoProps,mapDispatchtoProps)(ViewStockContainer);
