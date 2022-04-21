import { createStore } from "redux"
import { reducer } from "./reducer"
import { applyMiddleware } from 'redux'

const loggerMiddleware = (store)=>(next)=>(action)=>{
    if(typeof action === "function")
        return action(store.dispatch)
    next(action)
}

export const store = createStore(
    reducer,
    applyMiddleware(loggerMiddleware)
)