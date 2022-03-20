import React,{ useState } from 'react'
import {connect} from 'react-redux';
import { addWatchList,updateWatchList} from '../Redux/action/stockListAction';
import { Container,Row,Modal,Col,Form ,Button} from 'react-bootstrap';
import GetWatchListContainer from './watchListContainer';
import fire from '../fire.js';
import Header from './Header';

function HomeContainer(props) {
  const user_id=fire.auth().currentUser.uid;
    const [watchList, setWatchList] = useState('');
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

    
    if(props.action==='Add'){
var actionButton=<div style={{padding:'10px'}}><Button variant="primary" style={{color:'green',backgroundColor:'lightgrey',borderRadius:'10%',height:'40px',width:'100px'}} onClick={()=>{props.addList(watchList,user_id);handleShow();}}>ADD</Button></div>;
    }else{
 actionButton=<div style={{padding:'10px'}}><Button variant="primary" style={{color:'green',backgroundColor:'lightgrey',borderRadius:'10%',height:'40px',width:'100px'}} onClick={()=>{props.updateList(props.id,watchList,user_id);handleShow();}}>UPDATE</Button></div>;  
    }

    return (
      
        <Container>
          <Header/>
        <Row>
        <Col>
    <h1 style={{margin: '4% 18%'}}>{props.action} WatchList Here </h1>
            <Form className="form">     
  <Form.Group controlId="formCategory">
    <Form.Label>Enter WatchList name</Form.Label>
    <Form.Control type="text" defaultValue={props.watchList} onChange={e=>setWatchList(e.target.value)} />
  
  </Form.Group>

  {actionButton}
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
   <GetWatchListContainer/>
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
    user_id:fire.auth().currentUser.uid,
    msg:state.msg
 }
}

const mapDispatchtoProps=(dispatch)=>{
 return{
    addList:function(ListName,user_id){
        dispatch(addWatchList(ListName,user_id));
    },
    updateList:function(id,ListName,user_id){
        dispatch(updateWatchList(id,ListName,user_id));
    }  
 }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(HomeContainer);
