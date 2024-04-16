// Search page
//   where the app searches for restaurant

import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Result from '../components/Result';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import 'react-dropdown/style.css';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import { setSearchActionCreator } from '../actions/actions';
import Box from '@mui/material/Box';
import Map from '../components/Map'
import Skeleton from 'react-loading-skeleton'


export default function search() {
  const [loading, setLoading] = useState(false);
  const [renderResults, setRenderResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('');
  const [radiusNum, setRadiusNum] = useState(1);
  const [centerMap, setCenterMap] = useState([])
  const [info, setInfo] = useState([])

  // get search state and deconstructe the search obj
  const searchState = useSelector((state) => state.search);
  const { type, query, radius } = searchState;  
  // console.log(radiusNum, searchType, searchValue)


  const generateSearchResults = async (e) => {
    e.preventDefault();
    console.log(searchType, searchValue, radiusNum)
    try {
      setLoading(true);
      const settings = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: searchType,
          radius: radiusNum * 1600,
          query: searchValue,
        })
      }
      if (searchType !== '' && radiusNum !== 0 && searchValue !== '') {
        const data = await fetch('/api/getLocationResults', settings);

        const response = await data.json(); // array of objects
        console.log('i am the response', response)
        response.places.sort((a, b) => a.walktime_num - b.walktime_num);
        const resultsArray = [];
        response.places.forEach((place, i) => {
          const { name, address, walktime, type, google_url, website_url, photo_url, phone_number, favorited, opening_hours, distance, ratings, walktime_num } = place;
          resultsArray.push(<Result key={i} name={name} address={address} walktime={walktime} favorited={favorited} type={type} google_url={google_url} website_url={website_url} photo_url={photo_url} phone_number={phone_number} opening_hours={opening_hours} ratings={ratings} distance={distance} walktime_num={walktime_num}></Result>)
        });
        setLoading(false);
        setCenterMap(response.places[0].center)
        setInfo(response.places)
        setRenderResults(resultsArray);
      }
    }
    catch (e) {
      console.log('category did not work')
      console.log(e.message);
    };
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


  useEffect(() => {
    setSearchValue(query)
    setSearchType(type)
  },[]);
  



  const marks = [
    {
      value: 1,
      label: '1 mi',
    },
    {
      value: 2,
      label: '2 mi',
    },
    {
      value: 3,
      label: '3 mi',
    },
    {
      value: 4,
      label: '4 mi',
    },
    {
      value: 5,
      label: '5 mi',
    },
  ];

  return (
    <section className='app-wrapper'>
      <div className='search-wrapper'>
        <div className='left-div'>
            <form onSubmit={generateSearchResults}>
              {/* PROBLEM LIES HERE SOMEWHERE OR WITH STATE. WHEN THE SEARCH FIELD IS FILLED OUT, THE CODE WORKS AS INTENDED. OTHERWISE IT DOES NOT WORK. Unsure still if its an issue pertaining to the value itself or what the input actually does. */}
              <input className='search-field' type="text" onChange={handleSearchField} placeholder="Search in a different location" value={searchValue} />
              <Box sx={{marginTop: "16px", marginBottom: "16px"}}>
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
                  marks={marks}
                  min={1}
                  max={5}
                  value={radiusNum}
                  sx={{marginTop: "16px", marginBottom: "16px"}}
                />
              </Box>
              <button className='btn'>Search</button>
            </form>
              <h2>{searchType !== '' && searchValue !== '' && radiusNum !== 0 ? `Showing ${searchType} in ${searchValue} within ${radiusNum} miles` : 'Start a search to get Walkable results'}</h2>
              {renderResults.length ? <div className='render-wrapper two'> {renderResults} </div> : <div><h3>Search for walkable places</h3> </div>}
        </div>
        <div className='right-div'>
          {renderResults.length ? <Map centerMap={centerMap} markers={info} /> : <div> <h3> Start search for mapped results</h3> </div>}
        </div>
      </div>
    </section>
  )
}