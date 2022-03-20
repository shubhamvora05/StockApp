import React,{ useState, useEffect} from 'react'
import {connect} from 'react-redux';
import { addStock, fetchSingleWatchList,getDefaultStocks } from '../Redux/action/stockListAction';
import {useSelector, useDispatch} from 'react-redux';
import { Container,Modal,Row,Col,Form ,Button} from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import ViewWatchListContainer from './viewWatchListContainer';
import Header from './Header';

function StockListContainer(props) {

    const [Ticker, setTicker] = useState(''); 
    const [show, setShow] = useState(false);
    

    const handleClose = () =>  {
        setTimeout(() => {
            setShow(false);
          }, 10);
        }
    const handleShow = () => {
        setTimeout(() => {
            setShow(true);
          }, 1000); }   
    
    let { id } = useParams();
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch( fetchSingleWatchList(id));
        dispatch(getDefaultStocks());
    });
   
    const allDefaultStocks=useSelector(state=>state.defaultStocks);

    if(allDefaultStocks){
      var DefaultStockData=allDefaultStocks.map((val,i)=>
       <option value={val.tickerSymbol} key={val._id}>{val.tickerSymbol}</option>
      )
    }

    const currentWatchList=useSelector(state=>state.allWatchLists); 

    var listNameVar;
   if(currentWatchList.length){
    listNameVar = <h1 style={{margin: '4% 10%'}}>Watchlist Name - {currentWatchList[0].WatchList}</h1>
   }else{
    listNameVar = <h1 style={{margin: '4% 10%'}}>Watchlist Name - Test </h1>
   }
  
    return (
      
<Container>
  <Header/>
    <Row>
      <Col>
       
        {listNameVar}
        
    <Form className="form">     
          
    
    <Form.Group controlId="formCategory">
      <Form.Label>Choose Ticker Symbol to add in watchList</Form.Label><br/>
      <select value={props.Ticker} defaultValue="AMZN" style={{width:'150px'}} onChange={e=>setTicker(e.target.value)}> 
      {DefaultStockData}
      </select>  
    </Form.Group>
    <div style={{padding:'10px 0',display:'inline-block'}}>
    <Button style={{color:'green',backgroundColor:'lightgrey',borderRadius:'10%',height:'40px',width:'150px'}} variant="primary" onClick={()=>{props.addTicker(id,Ticker);handleShow();}}>ADD</Button></div>
    </Form>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sold Stock Information </Modal.Title>
        </Modal.Header>
        <Modal.Body><p>{props.msg}</p>
                    </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
    msg:state.msg,
    defaultStocks:state.defaultStocks
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
