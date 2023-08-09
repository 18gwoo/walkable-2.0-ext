import * as actions from '../actions/actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  query: '',
  radius: 0,
};

const searchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.setSearchActionCreator, (state, action) => {
      const { type, query, radius } = action.payload;
      return (state = {
        type,
        query,
        radius: radius,
      });
    })
    .addDefaultCase((state, action) => state);
});

export default searchReducer;
