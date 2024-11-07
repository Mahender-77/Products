import { legacy_createStore,applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import { reducer } from './reducer'

const initialState={
    inputValue:"",
    auth:false,
    count:0,
    
    }
export const store =legacy_createStore(reducer,initialState,applyMiddleware(thunk))

