import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoritesActionCreator } from '../actions/actions';



export default function Result(props) {

  const [isFavorited, setIsFavorited] = useState(false);
  const favorites = useSelector((state) => state.favorites.favorites);
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
      dispatch(setFavoritesActionCreator(response.data));
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
      dispatch(setFavoritesActionCreator(response.data));
      setIsFavorited(false);
    }
    catch (e) {
      console.log(e.message);
    }
  };


  const inStore = (name) => {
    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].name === name) return true;
    }
    return false;
  };
  // inStore(props.name)
  // isFavorited

  // name, address, walktime, type, google_url, website_url, photo_url, phone_number, favorited, opening_hours, distance, ratings, walktime_num
  return (
    <div className='result-wrapper'>
      <a href={props.google_url} target= '_blank'>
        <img src={props.photo_url} className='result-photo'/>
      </a>
        <div className='result-title-div'>
          <p className='result-name'>{props.name}</p>
          <p className={props.opening_hours === 'true' ? 'result-opening' : 'result-opening closed'}>{props.opening_hours === 'true' ? 'Open' : 'Closed'}</p>
        </div>
          <p className='result-address'>{props.address}</p>
        <div className='result-walking'>
          {props.distance} • 
          {props.walktime}
        </div>
        
        {/* {props.phone_number !== undefined ? props.phone_number : 'No Phone Number'} */}
        {/* {props.ratings} */}
        
        <button className={inStore(props.name) ? 'btn secondary' : 'btn'} onClick={inStore(props.name) ? handleDeleteFavorite : handleAddFavorite}>{inStore(props.name) ? 'Unfavorite' : 'Add to Favorite'}</button>
    </div>
  )
}
