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


export default function search() {
  const [loading, setLoading] = useState(false);
  const [renderResults, setRenderResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('restaurant');
  const [radiusNum, setRadiusNum] = useState(1);
  const [centerMap, setCenterMap] = useState([])
  const [coordMap, setCoordMap] = useState([])
  const [info, setInfo] = useState([])
  // const []
  // get search state and deconstructe the search obj
  const searchState = useSelector((state) => state.search);
  const { type, radius, query } = searchState;

  const dispatch = useDispatch();

  console.log(type, radius, query);
  // post request to get results from search
  const generateCategoryResults = async () => {
    try {
      setLoading(true);
      const settings = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type,
          radius: radius,
          query: query,
        })
      }

      if (type !== '' && radius !== 0 && location !== '') {

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
  }


  const generateSearchResults = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      dispatch(setSearchActionCreator({ type: searchType, query: searchValue, radius: radiusNum*1600 }));
      const settings = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: searchType,
          radius: radiusNum * 1600, // converting miles to meters
          query: searchValue,
        })
      }
      const data = await fetch('/api/getLocationResults', settings);
      const response = await data.json();
      response.places.sort((a, b) => a.walktime_num - b.walktime_num);
      const resultsArray = [];

      response.places.forEach((place, i) => {
        const { name, address, walktime, type, google_url, website_url, photo_url, phone_number, favorited, opening_hours, distance, ratings, walktime_num, coordinates } = place;

        resultsArray.push(<Result key={i} name={name} address={address} walktime={walktime} favorited={favorited} type={type} google_url={google_url} website_url={website_url} photo_url={photo_url} phone_number={phone_number} opening_hours={opening_hours} ratings={ratings} distance={distance} walktime_num={walktime_num}></Result>)
      });
      setLoading(false);
      setCenterMap(response.places[0].center)
      setInfo(response.places)
      setRenderResults(resultsArray);
    }
    catch (e) {
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


  useEffect(() => {
    generateCategoryResults();
  }, []);

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
              <h2>Showing {type} in {query} within {radius / 1600} miles</h2>
              
              {renderResults.length ? <div className='render-wrapper two'> {renderResults} </div> : <div> <h3>Search for nearby walkable places</h3> </div>}
        </div>
        <div className='right-div'>
          {renderResults.length ? <Map centerMap={centerMap} markers={info} /> : <div> <h3> Map is loading... </h3> </div>}
        </div>
      </div>
    </section>
  )
}

