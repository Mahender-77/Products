import {legacy_createStore} from 'redux'
import { reducer } from './reducer'
// import {data} from  './db.json'
const intialState={
    inputValue:"",
    value:"",
    priceV:"",
    status:false,
    todo:[],
    auth:false,
    }
export const store =legacy_createStore(reducer,intialState)

