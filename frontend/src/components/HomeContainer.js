import React,{ useState } from 'react'
import {connect} from 'react-redux';
import { addWatchList,updateWatchList} from '../Redux/action/stockListAction';
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import GetWatchListContainer from './watchListContainer';
import fire from '../fire.js';
import Header from './Header';

function HomeContainer(props) {
  const user_id=fire.auth().currentUser.uid;
    const [watchList, setWatchList] = useState('');

    
    if(props.action==='Add'){
var actionButton=<Button variant="primary" onClick={()=>props.addList(watchList,user_id)}>ADD</Button>;
    }else{
 actionButton=<Button variant="primary" onClick={()=>props.updateList(props.id,watchList,user_id)}>UPDATE</Button>;  
    }

    return (
      
        <Container>
          <Header/>
        <Row>
        <Col>
    <h1>{props.action} WatchList </h1>
            <Form className="form">     
    <p>{props.msg}</p>
  <Form.Group controlId="formCategory">
    <Form.Label>Enter WatchList name</Form.Label>
    <Form.Control type="text" defaultValue={props.watchList} onChange={e=>setWatchList(e.target.value)} />
  
  </Form.Group>

  {actionButton}
  </Form>
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
