import * as actions from '../actions/actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
 favorites: [],
};

const favoritesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.setFavoritesActionCreator, (state, action) => {
      return (state = {favorites: action.payload});
    })
    .addDefaultCase((state, action) => state);
});

export default favoritesReducer;
