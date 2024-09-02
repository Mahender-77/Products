import {legacy_createStore} from 'redux'
import { reducer } from './reducer'
// import {data} from  './db.json'
const intialState={
    value:"",
    priceV:"",
    status:false,
    todo:[],
    }
export const store =legacy_createStore(reducer,intialState)

