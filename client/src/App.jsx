import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './Components/Header'
import FooterComponent from './Components/FooterComponent'
import PrivateRoute from './Components/PrivateRoute'
import AdminPrivateRoute from './Components/AdminPrivateRoute'
import CreatePost from './pages/CreatePost'

function App() {


  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<SignUp />} />
        <Route path='/register' element={<Signin />} />
        <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<AdminPrivateRoute/>}><Route path='/create-post' element={<CreatePost/>}/></Route>
        <Route path='/projects' element={<Projects />} />

      </Routes>
    <FooterComponent/>
    </BrowserRouter>
  )
}

export default App
