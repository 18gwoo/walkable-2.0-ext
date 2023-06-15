import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFavoritesActionCreator } from '../actions/actions';

export default function Result(props) {

  const [isFavorited, setIsFavorited] = useState(false);

  const dispatch = useDispatch();


  const handleAddFavorite = async () => {
    try {
      const settings = {
        method: 'POST',
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
          },
          body: JSON.stringify(props)
        }
      const data = await fetch('/api/addFavorite', settings);
      const response = await data.json(); // new marketList 
      console.log(response);
      dispatch(setFavoritesActionCreator(response));
        setIsFavorited(true);
    }
    catch (e) {
      console.log(e.message);
    }
  };


  const handleDeleteFavorite = async () => {
    try {
      const settings = {
        method: 'DELETE',
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
            
          },
        body: JSON.stringify(props)
        }
      const data = await fetch('/api/deleteFavorite', settings);
      const response = await data.json();
      console.log(response);
      dispatch(setFavoritesActionCreator(response));
      setIsFavorited(false);
    }
    catch (e) {
      console.log(e.message);
    }
  };
  // name, address, walktime, type, google_url, website_url, photo_url, phone_number, favorited, opening_hours, distance, ratings, walktime_num
  return (
    <div>Result
        <button onClick={isFavorited ? handleDeleteFavorite : handleAddFavorite}>{isFavorited ? 'UnFavorite' : 'Add to Favorite'}</button>
        {props.name}
        {props.address}
        {props.phone_number}
        {props.walktime}
        {props.distance}
    </div>
  )
}
