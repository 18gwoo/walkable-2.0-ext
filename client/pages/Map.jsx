import React, { useState, useEffect } from 'react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import { useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Link } from '@mui/material';
import bar from '../assets/bar.svg'
import cafe from '../assets/cafe.svg'
import restaurant from '../assets/food.svg'
import store from '../assets/store.svg'
import park from '../assets/tree.svg'





const Map = ({ centerMap, markers }) => {
  const [selectedElement, setSelectedElement] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setInfoWindowFlag] = useState(true);


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_API_KEY
  });

  const center = useMemo(() => ({ lat: centerMap[0], lng: centerMap[1] }), [centerMap]);

  return (
    <div className="mapTwo">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={11}
        >
          {markers.map((element, i) => {
            const { name, address, walktime, type, google_url, website_url, photo_url, phone_number, favorited, opening_hours, distance, ratings, walktime_num, coordinates } = element
            let icon;
            if (type === 'bar') {
              icon = bar
            } else if (type === 'restaurant') {
              icon = restaurant
            } else if (type === 'park') {
              icon = park
            } else if (type === 'cafe') {
              icon = cafe
            } else icon = store
            return (<Marker icon={icon} key={i} onClick={() => {
              setSelectedElement(true);
              setActiveMarker(i);
            }} position={{ lat: coordinates[0], lng: coordinates[1] }}>
              {(selectedElement && activeMarker === i) ? (
                <InfoWindow key={i} visible={showInfoWindow}
                  marker={activeMarker}
                  onCloseClick={() => {
                    setSelectedElement(null);
                  }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        src={photo_url}
                        alt={name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {name}
                        </Typography>
                        <Typography variant="h6" component="div">
                          Rating: {ratings} <Typography variant="body2" display="inline">{walktime}</Typography>
                        </Typography>
                        <Typography variant="body2">{distance}</Typography>
                        <Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">
                          {address}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {phone_number === 'undefined' ? 'no numba srrywee uwu' : phone_number}
                        </Typography>
                        <Link sx={{ mr: 1 }} href={google_url} underline="none">
                          Google Link
                        </Link>
                        <Link href={website_url} underline="none">
                          Website
                        </Link>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </InfoWindow>
              ) : null}
            </Marker>
            )
          })}

        </GoogleMap>
      )}
    </div>
  );
};
export default Map