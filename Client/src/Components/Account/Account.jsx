import { useState } from 'react'
import axios from 'axios'
import './account.css'
import { useNavigate } from 'react-router-dom'
import { setAuth } from '../../Redux/action'
import { useDispatch } from 'react-redux'

export const Account = () => {

    const baseUrl = `https://ajayappartment.herokuapp.com`
    // const baseUrl = `http://localhost:7000`
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const dummyUser = {
        email : "",
        password : ""
    }
    const [user,setUser] = useState(dummyUser)
    function inputHandler(e){
        const {name, value} = e.target
        setUser({ ...user,[name] : value})
    }
    async function signUpBtn(){
        const a = await axios.post(`${baseUrl}/signup`, user)
        const response = a.data
        if(response.status === 'failed')
            return alert('Please provide unique cardential')
        setUser(dummyUser)
        alert('Please signIn now')
    }
    async function signInBtn(){
        const a = await axios.post(`${baseUrl}/signin`, user)
        const response = a.data
        console.log(user, response)
        if(response.status === 'failed')
            return alert('Wrong credentials')
        setUser(dummyUser)
        localStorage.setItem('token', JSON.stringify(response.token))
        dispatch(setAuth(true))
        navigate('/')
    }
    
    return (
        <>
            <h1 className=" header">Sign up & Sign in</h1>

            <div className='container my-container'>
                <div className="split left"   >
                    <div className="centered">
                        <div className="container mt-5" >
                            <div className="mb-3 row">
                                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input onChange={inputHandler} name='email' type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="mt-5 row">
                                <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input onChange={inputHandler} name='password' type="password" className="form-control" id="inputPassword" />
                                </div>
                            </div>
                            <button onClick={signUpBtn} className="btn btn-primary mt-5" type="button">SIGN UP</button>
                        </div>
                    </div>
                </div>

                <div className="split right">
                    <div className="centered">
                        <div className="container mt-5">
                            <div className="mb-3 row">
                                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input onChange={inputHandler} name='email' type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="mt-5 row">
                                <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input onChange={inputHandler} name='password' type="password" className="form-control" id="inputPassword" />
                                </div>
                            </div>
                            <button onClick={signInBtn} className="btn btn-primary mt-5" type="button">SIGN IN</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}