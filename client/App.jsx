import React from 'react';
import { Route, Routes } from 'react-router';
import Navbar from './components/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import './styles.scss';

export default function App() {

  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route element={<Navbar />} >
          <Route path='/search' element={<Search />} />
          <Route path='/dashboard' element={<Dashboard />} />
          {/* <Route path='/detail' element={<Detail/>}/> */}
        </Route>

      </Routes>
    </>
  )
}
