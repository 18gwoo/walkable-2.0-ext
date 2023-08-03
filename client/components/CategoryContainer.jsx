import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchActionCreator } from '../actions/actions';
import BarIcon from '../assets/bar.svg';
import CafeIcon from '../assets/cafe.svg';
import FoodIcon from '../assets/food.svg';
import StoreIcon from '../assets/store.svg';
import TreeIcon from '../assets/tree.svg';
import { ClassNames } from '@emotion/react';

export default function CategoryContainer({ type, radius, location }) {
    
  // dispatch used to set state
  const dispatch = useDispatch();

  // used to navigate user to search
  const navigate = useNavigate();

  // handle category click
  const onCategoryClick =  async () => {
    try {
      dispatch(setSearchActionCreator({type, query: location, radius}));
      navigate('/search');
    } catch (e) {
      console.log(e.message);
    }
  };

  const photoObj = {
    restaurant: FoodIcon,
    cafe: CafeIcon,
    park: TreeIcon,
    bar: BarIcon,
    store: StoreIcon,
  };

  return (
    <div>
      <NavLink to='/search' className="category-nav">
        <button onClick={onCategoryClick} className='category-button'>
          <img src={photoObj[type]} className="category-photo"/>    
          <h3>{type}</h3>
        </button>
      </NavLink>
    </div>
  );
}
