import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserActionCreator } from '../actions/actions';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { Navigate } from "react-router-dom"

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
              walking_distance: distance*1600, // converting miles to meters
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


  return (
    <div>
      Signup for Walkable
      <form onSubmit={handleSignUp}>
        <input type='text' placeholder='First Name' onChange={handleFirstName} value={firstName}/>
        <br></br>
        <input type='text' placeholder='Last Name' onChange={handleLastName} value={lastName}/>
        <br></br>
        <input type='text' placeholder='Email Address' onChange={handleEmail} value={email}/>
        <br></br>
        <Box sx={{ width: 300 }}>
        <Slider
        aria-label="Miles"
        defaultValue={1}
        onChange={handleSetDistance}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={5}
        value={distance}
      />
      </Box>
        <br></br>
        <input type='text' placeholder='Your Location' onChange={handleLocation} value={location}/>
        <br></br>
        <input type='password' placeholder='Super Secret Password' onChange={handlePassword} value={password}/>
        <br></br>
        <button type='submit' > Sign up </button>
      </form>
      <NavLink to="/login" ><button>Go to Login</button></NavLink>
    </div>
  )
}
