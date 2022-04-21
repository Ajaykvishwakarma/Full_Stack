import axios from "axios"
import { AUTH, FETCH_DATA, FETCH_RESIDENTS, LODING } from "./actionTypes"




export const setData = (payload)=>({ type : FETCH_DATA, payload})
export const setLoding = (payload)=>({ type : LODING, payload})
export const setResidents = (payload)=>({ type : FETCH_RESIDENTS, payload})
export const setAuth = (payload) => ({type : AUTH, payload})


export const fetchData = (url) => async (dispatch)=>{
    const token = JSON.parse(localStorage.getItem('token'))
    console.log({url})
    dispatch(setLoding(false))
    const a = await fetch(url, {
        method : "GET",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    const res = await a.json()
    const data = res
    dispatch(setLoding(true))
    dispatch(setData(data))
}
export const fetchResidents = (url) => async (dispatch)=>{
    const token = JSON.parse(localStorage.getItem('token'))
    console.log({url})
    dispatch(setLoding(false))
    const a = await fetch(url, {
        method : "GET",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    const res = await a.json()
    const data = res.residents
    dispatch(setLoding(true))
    dispatch(setResidents(data))
}
