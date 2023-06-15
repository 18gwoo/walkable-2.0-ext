import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
// import FavoritesContainer from '../components/favoritesContainer'
import CategoryContainer from '../components/CategoryContainer'
import { setFavoritesActionCreator } from '../actions/actions';
import Result from '../components/Result';

export default function Dashboard() {
  const [renderFavorites, setRenderFavorites] = useState([]);
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites.favorites);
  console.log('favorites global:', favorites);
  const {location, radius} = user;

  // create a const array to hold all favorites
  const dispatch = useDispatch();
  
    // build favorites from favorites
    const getFavorites = () => {
      const favoritesArray = [];
        favorites.forEach(favorite => {
          const {name, address, walktime, type, google_url, website_url, photo_url, phone_number, favorited, opening_hours, distance, ratings, walktime_num} = favorite; // store
          favoritesArray.push(<Result name={name} address={address} walktime={walktime} favorited={favorited} type={type} google_url={google_url} website_url ={website_url} photo_url={photo_url} phone_number={phone_number} opening_hours={opening_hours} ratings={ratings} distance={distance} walktime_num={walktime_num}></Result>)
        });
      setRenderFavorites(favoritesArray);
    }
 
    // useEffect to fetch new favorites from db when state changes
    useEffect(() => {
      getFavorites();
    }, [favorites]);
  
  return (
    <section className='app-wrapper'>
    <div>
      <div>
        <h2>What do you want to do in {location !== '' ? location + '?' : 'your area?'}</h2>
        <CategoryContainer type={'restaurant'} location={location} radius={radius}/>
        <CategoryContainer type={'bar'} location={location} radius={radius}/>
        <CategoryContainer type={'park'} location={location} radius={radius}/>
        <CategoryContainer type={'store'} location={location} radius={radius}/>
        <CategoryContainer type={'cafe'} location={location} radius={radius}/>
      </div>
      <div>
      <h2>Your Favorites</h2>
      {renderFavorites}
      </div>
    </div>
    </section>
  )
}


