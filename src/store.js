import {createStore, combineReducers, applyMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
