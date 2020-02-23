import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const initialState = {};
//We can add more middlewares later, if we want, so we have an array of middlewares
const middlewares = [ thunk ];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
