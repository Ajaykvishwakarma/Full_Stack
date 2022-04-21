import { fetchData } from "./action";
import { AUTH, FETCH_DATA, FETCH_RESIDENTS, LODING } from "./actionTypes";

const initialState = {
    dataObj : { },
    residents : [],
    loding : true,
    auth : false
}
export const reducer = ( state = initialState, { type , payload})=>{
    switch(type){
        case FETCH_DATA:
            return { ...state, dataObj : payload}
        case LODING:
            return { ...state, loding : payload}
        case FETCH_RESIDENTS:
            return { ...state, residents : payload}
        case AUTH : 
            return { ...state, auth : payload}
        default : 
            return state
    }
}