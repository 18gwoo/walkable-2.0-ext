import React from 'react';
// import LandingPage from './LandingPage'
// import ResultsPage from './ResultsPage'
import { Route, Routes } from 'react-router';
import Navbar from './components/NavBar';
import Login from './pages/login';
import Signup from './pages/signup';
import Search from './pages/search';
import Dashboard from './pages/dashboard';
import './styles.css';

export default function App() {
// const [addressInput, setAddressInput] = useState(undefined);
// const [keywordChoice, setKeywordChoice] = useState('') 

const showNav = [];
if (location.pathname !== '/login' && location.pathname !== '/') {
  showNav.push(<Navbar/>);
}

return (
    <>
    {/* {addressInput === undefined ? <LandingPage keywordChoice={keywordChoice} setKeywordChoice={setKeywordChoice} addressInput={addressInput} setAddressInput={setAddressInput} /> : <ResultsPage addressInput={addressInput} setAddressInput={setAddressInput} keywordChoice={keywordChoice} />} */}
    {/* {showNav} */}
    <Navbar/>
    <Routes> 
      <Route path='/login' element={<Login/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      {/* <Route path='/detail' element={<Detail/>}/> */}
      <Route path='/' element={<Signup/>}/>
    </Routes>
    </>
  )
}
