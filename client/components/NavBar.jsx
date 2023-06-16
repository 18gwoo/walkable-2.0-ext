import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Logo from '../assets/walkable_logo.svg'
import SearchIcon from '../assets/search.svg'
import HomeIcon from '../assets/home.svg'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchActionCreator } from '../actions/actions';

export default function navBar() {
  const dispatch = useDispatch();

  const resetSearchState = () => {
    dispatch(setSearchActionCreator({ type: '', query: '', radius: 0 }));
 };

  return (
    <div>
    <nav className='nav-bar'>
      <img src={Logo} className='nav-logo'/>
        <NavLink className='nav-bar-item' to="/dashboard" onClick={resetSearchState}><img className="nav-icon" src={HomeIcon}/>Dashboard</NavLink> 
        <NavLink className='nav-bar-item' to="/search"><img className="nav-icon" src={SearchIcon}/>Search</NavLink>
    </nav>
    <Outlet/>
    </div>
  )
}
