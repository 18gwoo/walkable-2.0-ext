import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { setUserActionCreator } from '../actions/actions';
import bg from '../assets/signup-bg.svg'
import Logo from '../assets/walkable_logo.svg'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // handle email and password inputs
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
 
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // declare dispatch to invoke action
  const dispatch = useDispatch();

  // use navigate to change route on successful login
  let navigate = useNavigate();
  
  // post request for login -> should update userState after 200 repsonse
  const handleLogin = async (e) => {
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
            email,
            password,
          })
        }
        const data = await fetch('/api/login', settings);
        const response = await data.json();
        dispatch(setUserActionCreator(response.data));
        navigate('/dashboard');
    }
    catch (e) {
      console.log(e);
    };
  };
  
  return (
    <section className='signup-section'>
      <div className='signup-wrapper'>
      <h1>Welcome Back</h1>
      <h3>Let's get back to walking...</h3>
      <form onSubmit={handleLogin} className='signup-form'>  
        <input type='text' placeholder='Email Address' onChange={handleEmail} value={email}/>
        <br></br>
        <input type='password' placeholder='Super Secret Password' onChange={handlePassword} value={password}/>
        <br></br>
        <button className='btn' type='submit'>Login</button>
      </form>
      <NavLink to="/" ><button className='btn secondary'>Go To Signup</button></NavLink>
    </div>
    <div className='signup-hero'>
    <div>
      <img className='signup-logo' src ={Logo}/>
    </div>
    <div className='bg-wrapper'>
      <img className='signup-bg' src ={bg}/>
    </div>
    </div>
    </section>
    )
}
