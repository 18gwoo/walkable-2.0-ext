import * as actions from '../actions/actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  imgUrl: '',
  radius: 1,
  location: '',
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.setUserActionCreator, (state, action) => {

    const {
      first_name,
      last_name,
      email,
      img_url,
      walking_distance,
      location,
    } = action.payload;
    return (state = {
      firstName: first_name,
      lastName: last_name,
      email,
      imgUrl: img_url,
      radius: walking_distance,
      location,
    });
  });
});

export default userReducer;
