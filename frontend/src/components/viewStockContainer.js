import React,{ useState, useEffect} from 'react'
import {connect} from 'react-redux';
import { getStockData } from '../Redux/action/stockListAction';
import {useSelector, useDispatch} from 'react-redux';
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import Header from './Header';

function ViewStockContainer(props) {

    let { id } = useParams();
    const dispatch=useDispatch();
    useEffect(()=>{
        const timer = setTimeout(() => {
            dispatch(getStockData(id));
          }, 60000);
     
    });
    const stockdata=useSelector(state=>state.stockData);
    console.log(stockdata.length);
    if(stockdata.length){
        var StockData=stockdata[0].close;
      }
    return (
        <Container>
            <Header/>
            <Row>
                <h1>stock {id}</h1>
                {StockData}
            </Row>
        </Container>
    )
}


export default ViewStockContainer;
