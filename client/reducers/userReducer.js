import * as actions from '../actions/actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  imgUrl: '',
  radius: 1,
  location: '',
  loginStatus: false,
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.setUserActionCreator, (state, action) => {
    // password,
    // email,
    // first_name,
    // last_name,
    // img_url,
    // walking_distance,
    // location,

    const {
      first_name,
      last_name,
      email,
      img_url,
      walking_distance,
      location,
      loginStatus,
    } = action.payload;
    return (state = {
      firstName,
      lastName,
      email,
      imgUrl,
      radius,
      location,
      loginStatus,
    });
  });
});

export default userReducer;
