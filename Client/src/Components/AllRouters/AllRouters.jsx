import { Route, Routes } from 'react-router-dom' 
import { Navbar} from '../Navbar/Navbar'
import { Main } from '../Main/Main'
import { Account } from '../Account/Account'
import { Flat } from '../Flat/Flat'


export const AllRouters = ()=>{

    return (
        <>
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/login' element={<Account/>}/>
                <Route path='/flat/:id' element={<Flat/>}/>
            </Routes>
        </>
    )
}