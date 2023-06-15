import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Result from '../components/Result';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import 'react-dropdown/style.css';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import { setSearchActionCreator } from '../actions/actions';
import Box from '@mui/material/Box';



export default function search() {
  const [renderResults, setRenderResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('restaurant');
  const [radiusNum, setRadiusNum] = useState(1);
  
  // get search state and deconstructe the search obj
  const searchState = useSelector((state) => state.search);
  const {type, radius, query} = searchState;

  const dispatch = useDispatch();


  // post request to get results from search
  // const generateCategoryResults = async () => {
  //   try {
  //   const settings = {
  //     method: 'POST',
  //     headers: {
  //        'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         type,
  //         radius: radius*1600, // converting miles to meters
  //         query: location,
  //       })
  //     }
      
  //   if (type !== '' && radius !== 0 && location !== '') { 
  //     const data = await fetch('/api/getLocationResults', settings);
  //     const response = await data.json(); // array of objects
  //     // walk time num used here to sort response
  //     const resultsArray = [];
  //       response.places.forEach(place => {
  //         const {name, address, distance, walktime, favorited} = place;
  //         resultsArray.push(<Result name={name} address={address} distance={distance} walktime={walktime} favorited={favorited}></Result>)
  //       });
  //     setRenderResults(resultsArray);
  //   }

  //   }
  //   catch (e) {
  //     console.log('didnt work')
  //     console.log(e.message);
  //   };
  // }


  const generateSearchResults = async (e) => {
    e.preventDefault();
    try {
      dispatch(setSearchActionCreator({type: searchType, query: searchValue, radius: radiusNum}));
      const settings = {
        method: 'POST',
        headers: {
           'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: searchType,
            radius: radiusNum*1600, // converting miles to meters
            query: searchValue,
          })
        }
        const data = await fetch('/api/getLocationResults', settings);
        const response = await data.json();
        response.places.sort((a, b) => a.walktime_num - b.walktime_num);
        console.log('i am the response', response)
        const resultsArray = [];
        response.places.forEach(place => {
          const {name, address, walktime, type, google_url, website_url, photo_url, phone_number, favorited, opening_hours, distance, ratings, walktime_num} = place;
          resultsArray.push(<Result name={name} address={address} walktime={walktime} favorited={favorited} type={type} google_url={google_url} website_url ={website_url} photo_url={photo_url} phone_number={phone_number} opening_hours={opening_hours} ratings={ratings} distance={distance} walktime_num={walktime_num}></Result>)
        });
        
      setRenderResults(resultsArray);
    }
    catch(e) {
      console.log('Not Working');
      console.log(e.message);
    }
  };


const handleSearchField = (e) => {
  setSearchValue(e.target.value);
};

const handleTypeDropdown = (e) => {
  setSearchType(e.target.value);
}

const handleRadiusSlider = (e) => {
  setRadiusNum(e.target.value);
};

// generateCategoryResults();

  return (
    <section className='app-wrapper'>
    <div>
      <form onSubmit={generateSearchResults}>
      <input type="text" onChange={handleSearchField} placeholder="Search in a different location" value={searchValue}/>
      <Box sx={{ width: 300 }}>
      <FormControl fullWidth>
        <InputLabel >Place</InputLabel>
        <Select
          value={searchType}
          label="Place"
          onChange={handleTypeDropdown}
        > 
          <MenuItem value={'restaurant'}>Restaurant</MenuItem>
          <MenuItem value={'bar'}>Bar</MenuItem>
          <MenuItem value={'park'}>Park</MenuItem>
          <MenuItem value={'store'}>Store</MenuItem>
          <MenuItem value={'cafe'}>Cafe</MenuItem>
        </Select>
      </FormControl>
      <Slider
        aria-label="Miles"
        defaultValue={1}
        onChange={handleRadiusSlider}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={5}
        value={radiusNum}
      />
      </Box>
      <button>Search</button>
      </form>
      <div>
        <div>Showing {type} in {query} within {radius} miles</div>
        {renderResults.length ? renderResults : <div> Search for nearby walkable places </div>}
      </div>
    </div>
    </section>
  )
}
