import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserActionCreator } from '../actions/actions';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { Navigate } from "react-router-dom"
import bg from '../assets/signup-bg.svg'
import Logo from '../assets/walkable_logo.svg'

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [distance, setDistance] = useState(3);
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');

  // check to see if cookie w/ user id exists
  // if yes
  // fetch user data using get user
  // populate userstate using action and user reducer
  // navigate to dashboard

  // handle signup inputs
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };


  const handleSetDistance = (e) => {
    setDistance(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  // declare dispatch to invoke action
  const dispatch = useDispatch();

  // use navigate to change route on successful login
  let navigate = useNavigate();

  // post request for signup -> should update userState after 200 repsonse
  const handleSignUp = async (e) => {
    // use prevent default here because of form default reload
    e.preventDefault();
    try {
      const settings = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          walking_distance: distance * 1600, // converting miles to meters
          password,
          location,
        })
      }
      const data = await fetch('/api/signup', settings);
      const response = await data.json();
      dispatch(setUserActionCreator(response.data));
      navigate("/dashboard");
    }
    catch (e) {
      console.log(e.message);
    };
  };


  const marks = [
    {
      value: 1,
      label: '1 mi',
    },
    {
      value: 2,
      label: '2 mi',
    },
    {
      value: 3,
      label: '3 mi',
    },
    {
      value: 4,
      label: '4 mi',
    },
    {
      value: 5,
      label: '5 mi',
    },
  ];

  return (
    <section className='signup-section'>
      <div className='signup-wrapper'>
        <h1>Create an Account</h1>
        <h3>Ready to start walking?</h3>
        <form onSubmit={handleSignUp} className='signup-form'>
          <input type='text' placeholder='First Name' onChange={handleFirstName} value={firstName} />
          <br></br>
          <input type='text' placeholder='Last Name' onChange={handleLastName} value={lastName} />
          <br></br>
          <input type='text' placeholder='Email Address' onChange={handleEmail} value={email} />
          <br></br>
          <input type='password' placeholder='Super Secret Password' onChange={handlePassword} value={password} />
          <div className='divider'></div>
          <p className='regular'>Your Walking Preferences</p>
          <Box sx={{ width: "100%" }}>
            <Slider
              aria-label="Miles"
              defaultValue={1}
              onChange={handleSetDistance}
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={1}
              max={5}
              value={distance}
            />
          </Box>
          <br></br>
          <input type='text' placeholder='Your Location' onChange={handleLocation} value={location} />
          <br></br>
          <button type='submit' className='btn'> Sign up </button>
        </form>
        <NavLink to="/login"><button className='btn secondary'>Go to Login</button></NavLink>
      </div>
      <div className='signup-hero'>
        <div>
          <img className='signup-logo' src={Logo} />
        </div>
        <div className='bg-wrapper'>
          <img className='signup-bg' src={bg} />
        </div>
      </div>
    </section>
  )
}
