import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import { Route,Routes } from 'react-router-dom'
import AddUser from './pages/AddUser'
import ReadProducts from './pages/ReadProducts'
import UploadImage from './pages/UploadImage'
function App() {
  return (
<Routes>

<Route path='/' element={<AddUser/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/read' element={<ReadProducts/>}/>
<Route path='/upload' element={<UploadImage/>}/>

</Routes>
 )
}

export default App
