import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchResidents } from "../../Redux/action"
import './flat.css'


export const Flat = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    // const baseUrl = `https://manageapartms.herokuapp.com`
    const baseUrl = `https://ajayappartment.herokuapp.com`
    const {residents } = useSelector(store => store)
    useEffect(()=>{
        let url = `${baseUrl}/flat/${id}`
        dispatch(fetchResidents(url))
    },[])
    return (
        <>
            <h3 className="mt-5 mb-2 my-heading">Information about All Residents</h3>
            <table id="customers" className='container'>
                <thead>
                    <tr>
                        <th>S.N.</th> 
                        <th>Name</th>
                        <th>Gender</th>
                        <th>age</th>
                    </tr>
                </thead>
                <tbody>
                    {residents?.map((resident,index)=><tr key={resident._id}>
                                <td>{index + 1}</td> 
                                <td>{resident.name}</td>
                                <td>{resident.gender}</td>
                                <td>{resident.age}</td>
                            </tr>)}
                </tbody>
            </table>
            {/* <ol className="list-group list-group-numbered my-list mt-4">
                <li className="list-group-item">A list item</li>
                <li className="list-group-item">A list item</li>
                <li className="list-group-item">A list item</li>
            </ol> */}
        </>
    )
}