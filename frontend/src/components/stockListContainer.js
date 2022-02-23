import React,{ useState, useEffect} from 'react'
import {connect} from 'react-redux';
import { addStock, fetchSingleWatchList } from '../Redux/action/stockListAction';
import {useSelector, useDispatch} from 'react-redux';
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import ViewWatchListContainer from './viewWatchListContainer';
import Header from './Header';

function StockListContainer(props) {

  
    const [Ticker, setTicker] = useState('');
    
    
    let { id } = useParams();
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch( fetchSingleWatchList(id))
    });
   
    const currentWatchList=useSelector(state=>state.allWatchLists); 
    var listNameVar;
   if(currentWatchList.length){
     console.log(currentWatchList);
    listNameVar = <h1>Watchlist Name - {currentWatchList[0].WatchList}</h1>
   }else{
    listNameVar = <h1>Watchlist Name - </h1>
   }
  
    return (
      
        <Container>
          <Header/>
        <Row>
        <Col>
        {listNameVar}
        <h2>Add Stocks Here</h2>
            <Form className="form">     
          
    <p>{props.msg}</p>
  <Form.Group controlId="formCategory">
    <Form.Label>Enter Ticker Symbol</Form.Label>
    <Form.Control type="text" defaultValue={props.Ticker} onChange={e=>setTicker(e.target.value)} />
  
  </Form.Group>

  <Button variant="primary" onClick={()=>props.addTicker(id,Ticker)}>ADD</Button>
  </Form>
   </Col>
   <Col>
   <ViewWatchListContainer id = {id} />
   </Col>
       </Row>
        </Container>
    )
}

const mapStatetoProps=(state)=>{
 return{
  watchList:state.watchList,
    action:state.action,
    id:state.id,
    msg:state.msg
 }
}

const mapDispatchtoProps=(dispatch)=>{
 return{
    addTicker:function(listId,Ticker){
        dispatch(addStock(listId,Ticker));
    }
 }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(StockListContainer);
