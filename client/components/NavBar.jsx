import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Logo from '../assets/walkable_logo.svg'
import SearchIcon from '../assets/search.svg'
import HomeIcon from '../assets/home.svg'


export default function navBar() {
  return (
    <div>
    <nav className='nav-bar'>
      <img src={Logo} className='nav-logo'/>
        <NavLink className='nav-bar-item' to="/dashboard"><img className="nav-icon" src={HomeIcon}/>Dashboard</NavLink> 
        <NavLink className='nav-bar-item' to="/search"><img className="nav-icon" src={SearchIcon}/>Search</NavLink>
    </nav>
    <Outlet/>
    </div>
  )
}
