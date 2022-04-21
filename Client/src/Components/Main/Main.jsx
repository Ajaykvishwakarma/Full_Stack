import { useEffect } from 'react'
import './main.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, setAuth } from '../../Redux/action'
import { useNavigate } from 'react-router-dom'

export const Main = () => {

    const navigate = useNavigate()
    const tokenStr = localStorage.getItem('token')
    const token = tokenStr ? JSON.parse(tokenStr) : navigate('/login')
    const [block, setBlock] = useState("")
    const [currPage, setCurrPage] = useState(1)
    const dispatch = useDispatch()
    const { dataObj, loding } = useSelector((store) => store)
    const baseUrl = `https://ajayappartment.herokuapp.com`
    // const baseUrl = `http://localhost:7000`

    useEffect(() => {
        let url = `${baseUrl}/flats`
        dispatch(fetchData(url))
    }, [])

    async function filterBtn(base) {
        console.log(base)
        let url = `${baseUrl}/flats?q=filter&base=${base}`
        dispatch(fetchData(url))

    }
    async function sortBtn(sort) {
        let url = `${baseUrl}/flats?q=sort&sort=${sort}`
        dispatch(fetchData(url))
    }
    async function searchBtn(e) {
        e.preventDefault()
        let url = `${baseUrl}/flats?q=search&block=${block}`
        dispatch(fetchData(url))
    }
    async function pageChange(page) {
        setCurrPage(page)
        let url = `${baseUrl}/flats?page=${page}`
        dispatch(fetchData(url))
    }
    function logout(){
        localStorage.removeItem('token')
        dispatch(setAuth(false))
    }
    return loding ? (
        <>
            <nav className="container navbar navbar-expand-xl navbar-light order-sm-12" style={{backgroundColor: "#e3f2fd", width:"100%"}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Main Page</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse px-5" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <div className="dropdown px-5">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Filter
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><button onClick={() => filterBtn("tenant")} className="dropdown-item" href="#">Tenant</button></li>
                                    <li><button onClick={() => filterBtn("owner")} className="dropdown-item" href="#">Owner</button></li>
                                </ul>
                            </div>
                            <div className="dropdown px-5">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><button onClick={() => sortBtn(1)} className="dropdown-item" href="#">Low to High</button></li>
                                    <li><button onClick={() => sortBtn(-1)} className="dropdown-item" href="#">High to Low</button></li>
                                </ul>
                            </div>
                        </ul>
                        <form className="d-flex">
                            <input onChange={(e) => setBlock(e.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button onClick={searchBtn} className="btn btn-outline-success" type="submit">Search</button>
                            <div className=" px-5">
                                <button onClick={logout} className="btn btn-secondary" type="button" id=""  aria-expanded="false">
                                    Logout
                                </button>
                                {/* <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><button onClick={() => filterBtn("tenant")} className="dropdown-item" href="#">Tenant</button></li>
                                    <li><button onClick={() => filterBtn("owner")} className="dropdown-item" href="#">Owner</button></li>
                                </ul> */}
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
            <div className="pagination">
                <Link to="#">&laquo;</Link>
                {dataObj?.totolPages?.map(page => <Link to={""} key={page} className={page == currPage ? "active" : ""} onClick={() => pageChange(page)}>{page}</Link>)}
                <Link to="#">&raquo;</Link>
            </div>
            <table id="customers" className='container'>
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th>Type</th>
                        <th>Block</th>
                        <th>Flat Number</th>
                        <th>Totol Residents</th>
                        <th>More</th>
                    </tr>
                </thead>
                <tbody>
                    {dataObj?.flats?.map((flat, index) => <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{flat.type}</td>
                        <td>{flat.block}</td>
                        <td>{flat.no}</td>
                        <td>{flat.residents.length}</td>
                        <td><Link to={`/flat/${flat._id}`}>more</Link></td>
                    </tr>)}
                </tbody>
            </table>

        </>
    ) : (
        <div id="loader"></div>
    )
}