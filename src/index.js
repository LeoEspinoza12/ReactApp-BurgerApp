import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom'

import {Provider} from 'react-redux'

import {createStore, applyMiddleware, compose, combineReducers} from 'redux'

import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'

import ReduxThunk from 'redux-thunk'

import createSagaMiddleware from 'redux-saga'
import {watchAuth} from '../src/store/sagas'

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})


const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development' ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(
  rootReducer, 
  composeEnhancers(
    applyMiddleware(ReduxThunk, sagaMiddleware)  
  ))

sagaMiddleware.run(watchAuth)


const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
