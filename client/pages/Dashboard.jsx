import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import FavoritesContainer from '../components/favoritesContainer'
import CategoryContainer from '../components/CategoryContainer';
import { setFavoritesActionCreator } from '../actions/actions';
import Man from '../assets/man.svg';
import Woman from '../assets/woman.svg';
import Result from '../components/Result';
import { render } from 'react-dom';

export default function Dashboard() {
  const [renderFavorites, setRenderFavorites] = useState([]);
  const user = useSelector((state) => state.user);
  const {location, radius} = user;
  const favorites = useSelector((state) => state.favorites.favorites);

  // create a const array to hold all favorites
  const dispatch = useDispatch();

  //  console.log('FAVORITE STORE', favorites);
  //   // build favorites from favorites
  const renderFavoriteResults = async () => {
    try {
      const favoritesArray = [];
      favorites.forEach(favorite => {
        const {name, address, walktime, type, google_url, website_url, photo_url, phone_number, favorited, opening_hours, distance, ratings, walktime_num} = favorite; // store
        favoritesArray.push(<Result name={name} address={address} walktime={walktime} favorited={favorited} type={type} google_url={google_url} website_url ={website_url} photo_url={photo_url} phone_number={phone_number} opening_hours={opening_hours} ratings={ratings} distance={distance} walktime_num={walktime_num}></Result>);
      });
      console.log('favArray:',favoritesArray);
      setRenderFavorites(favoritesArray);
    }
    catch (e) {
      console.log(e.message);
    }

  };

  // get initial favorites

  async function getFavorites() {
    try {
      const data = await fetch('/api/getAllFavorites');
      const response = await data.json(); 
      console.log(response);
      dispatch(setFavoritesActionCreator(response.data));
      // setStoreFavorites(response.data);
    }
    catch (e) {
      console.log(e.message);
    }
  }

 
  // useEffect to fetch new favorites from db when state changes
  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    renderFavoriteResults();
  }, [favorites]);

  
  return (
    <section className='app-wrapper'>
      <div>
        <div className='category-div'> 
          <img src={Woman} className='dashboard-woman'/>
          <img src={Man} className='dashboard-man'/>
          <h2>What do you want to do around {location !== '' ? location + '?' : 'your area?'}</h2>
          <div className='category-container'> 
            <CategoryContainer type={'restaurant'} location={location} radius={radius}/>
            <CategoryContainer type={'bar'} location={location} radius={radius}/>
            <CategoryContainer type={'park'} location={location} radius={radius}/>
            <CategoryContainer type={'store'} location={location} radius={radius}/>
            <CategoryContainer type={'cafe'} location={location} radius={radius}/>
          </div>
        </div>
        <div>
          <h2>Your Favorites</h2>
          <div className='render-wrapper'>
            {renderFavorites.length ? renderFavorites : <div> You have no favorites </div>}
          </div>
        </div>
      </div>
    </section>
  );
}


