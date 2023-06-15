import * as actions from '../actions/actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
 favorites: [],
};

const favoritesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.setFavoritesActionCreator, (state, action) => {
      const { data } = action.payload;
      return (state = {favorites: data});
    })
    .addDefaultCase((state, action) => state);
});

export default favoritesReducer;
