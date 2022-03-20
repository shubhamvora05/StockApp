import React,{ useState, useEffect} from 'react'
import {connect} from 'react-redux';
import { getStockData,buyCurrentStock,sellCurrentStock } from '../Redux/action/stockListAction';
import {useSelector, useDispatch} from 'react-redux';
import { Table,Container,Row,Col,Form, Modal ,Button} from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import Header from './Header';
import fire from '../fire.js';
import ChartContainer from './chartContainer';

function ViewStockContainer(props) {
    const [show, setShow] = useState(false);
    const [showSell, setShowSell] = useState(false);

    const handleClose = () =>  {
        setTimeout(() => {
            setShow(false);
          }, 10);
        }
    const handleShow = () => {
        setTimeout(() => {
            setShow(true);
          }, 1000); }

          const handleCloseSell = () =>  {
            setTimeout(() => {
                setShowSell(false);
              }, 10);
            }
        const handleShowSell = () => {
            setTimeout(() => {
                setShowSell(true);
              }, 1000); }
    let { id } = useParams();
    const dispatch=useDispatch();
    useEffect(()=>{
        setTimeout(() => {
            dispatch(getStockData(id));
          }, 60000);
     
    });
    const stockdata=useSelector(state=>state.stockData);
    var buy_price=100;
    var sell_price=100;
    var high_price=100;
    var low_price=100;
    var volume = 1000;
    var date="2022-03-17";
    if(stockdata.length){
         buy_price = stockdata[0].close;
         sell_price = stockdata[0].close;
         high_price = stockdata[0].high;
         low_price = stockdata[0].low;
         volume = stockdata[0].volume;
         date = stockdata[0].date;
      }
      const [total_quantity, settotal_quantity] =useState(10);

    const user_id=fire.auth().currentUser.uid;
    

    return (
        <Container>
            <Header/>
            <Row>
            <h1 style={{padding: '2% 47% 0%'}}>{id}</h1>
            </Row>
            <Row style={{marginTop:"20px"}}>
            <ChartContainer/>
            </Row>
            <Row>
                <Col>
            <Table striped bordered hover size="sm" style={{margin: '6% 20% 6%',width:'60%', backgroundColor:'lightgrey',height: '200px'}}>
                
                <tbody>
                <tr>
                    <td>Price</td>
                    <td>{buy_price}</td>
                </tr>
                <tr>
                    <td>High</td>
                    <td>{high_price}</td>
                </tr>
                <tr>
                    <td>Low</td>
                    <td>{low_price}</td>
                </tr>
                <tr>
                    <td>Volume</td>
                    <td>{volume}</td>
                </tr>
                <tr>
                    <td>date</td>
                    <td>{date}</td>
                </tr>
                </tbody>
            </Table>
            </Col>
            <Col>
            </Col>
            </Row>
            
            <Row>
                <Form className="form">                     
                    <Form.Group controlId="formCategory">
                    <Form.Label>Enter quantity to Buy / Sell {id}</Form.Label>
                    <Form.Control type="text" defaultValue={props.total_quantity} onChange={e=>settotal_quantity(e.target.value)} />
                    </Form.Group>
                    <p><b>Note:</b> Your stock will be Bought / sold at current stock price.</p>

                    <div style={{padding:'10px',display:'inline-block'}}>
                    <Button  onClick={()=>{props.buyStock(id,user_id,buy_price,total_quantity);handleShow();}} style={{color:'green',backgroundColor:'lightgrey',borderRadius:'10%',height:'40px',width:'100px'}}>Buy {id}</Button>
                    </div><div style={{padding:'10px',display:'inline-block'}}>
                    <Button  onClick={()=>{props.sellStock(id,user_id,sell_price,total_quantity);handleShowSell();}} style={{color:'red',backgroundColor:'lightgrey',borderRadius:'10%',height:'40px',width:'100px'}}>Sell {id}</Button>
                    </div>
                </Form>
                
            

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sold Stock Information </Modal.Title>
        </Modal.Header>
        <Modal.Body><p>{props.buystockData[0]}</p><p> Buy Price is $ {props.buystockData[1]}</p>
                    <p>Total amount used is ${props.buystockData[2]}</p>
                    
                    </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSell} onHide={handleCloseSell}>
        <Modal.Header closeButton>
          <Modal.Title>Bought Stock Information </Modal.Title>
        </Modal.Header>
        <Modal.Body><p>{props.sellstockData[0]}</p><p>Sold price is ${props.sellstockData[1]}</p>
                    <p>Total amount Released is ${props.sellstockData[2]}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSell}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
