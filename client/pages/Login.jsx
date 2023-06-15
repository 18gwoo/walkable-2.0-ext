import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { setUserActionCreator } from '../actions/actions';

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
      console.log(e.message);
    };
  };
  
  return (
    <div>
      Login to Walkable
      <form onSubmit={handleLogin}>  
        <input type='text' placeholder={'Email Address'} onChange={handleEmail} value={email}/>
        <br></br>
        <input type='text' placeholder={'Password'} onChange={handlePassword} value={password}/>
        <br></br>
        <button type='submit'>Login</button>
      </form>
      <NavLink to="/" ><button>Go To Signup</button></NavLink>
    </div>
    )
}
