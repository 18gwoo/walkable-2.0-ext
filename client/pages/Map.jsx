import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';

const Map = ({ centerMap, markers }) => {
  const searchState = useSelector((state) => state.search);
  const [mapMarker, setMapMarker] = useState([])
  



  const { isLoaded } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_API_KEY
  });
  // const { centerMap, markers } = props
  // console.log('i am props', centerMap, markers)
  const center = useMemo(() => ({ lat: centerMap[0], lng: centerMap[1] }), []);

  useEffect(() => {

    const markerArray = []
    for (let i = 0; i < markers.length; i++) {
      markerArray.push(<Marker position={{ lat: markers[i][0], lng: markers[i][1] }} />)
    }
    setMapMarker(markerArray)
    console.log('i am map marker setter', mapMarker)
  }, [centerMap])

  return (
    <div className="mapTwo">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        // <GoogleMap
        //   mapContainerClassName="map-container"
        //   center={center}
        //   zoom={11}
        // />
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          {mapMarker}
        </GoogleMap>
      )}
    </div>
  );
};
export default Map