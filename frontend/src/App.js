import MainContainer from './components/MainContainer';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import stockListReducer from './Redux/Reducer/stockListReducer';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(stockListReducer,composedEnhancer);

function App() {
  return (
   <Provider store={store}>
    <div className="App">
    <MainContainer/>
    </div>
  </Provider>
  );
}

export default App;
