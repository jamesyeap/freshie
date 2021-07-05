import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from '../reducers/index';

export const store = createStore(RootReducer, applyMiddleware(thunk, logger));