const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});

const apiController = {};
// api key is saved in a .env file, then brought into global scope
const key = process.env.GOOGLE_API_KEY;

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// convert an address to lattitude and longitude (necessary for determining distances from/to locations)

apiController.addressToLocation = async (req, res, next) => {
  try {
    const { query } = req.body;
    const response = await client.geocode({
      params: {
        address: query,
        key: key,
      }
    })
    console.log(`address to location response`, response.data.results[0].geometry.location)
    const { lat, lng } = response.data.results[0].geometry.location;
    res.locals.addressLocation = [lat, lng];
    next();
  }
  catch (e) {
    next({
      log: 'Express error handler caught addressToLocation middleware error',
      status: 400,
      message: { err: 'An error occurred', error: e },
    });
  };
};

// fetch and return locations based off a query
apiController.getLocationResults = async (req, res, next) => {
  try {
    // define information to be used in fetch request
    const { addressLocation } = res.locals;
    // console.log('i am address location', addressLocation)
    const location = `${addressLocation[0]},${addressLocation[1]}`
    const { radius, type } = req.body;
    // console.log('i am radius and type in getlocationresults',req.body)
    const keywordChoice = req.body.keywordChoice

    let url;
    // console.log(keywordChoice)
    if (keywordChoice) {
      url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&keyword=${keywordChoice}&key=${key}`
    } else {
      url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&keyword=all&key=${key}`
    }
    // console.log(url)

    // const radius = 1100;
    // const type = 'restaurant';

    // fetch google-maps api data (only works on one line for some reason)
    const response = await fetch(url)
    // format response
    const data = await response.json();
    // console.log(data)

    const results = data.results;
    // console.log(results)
    // fill array with relevant info, distance lat,lng will be converted in following middleware
    const arrayOfPlaces = [];
    // console.log(results[1].photos)

    //Need to put logic in here for whatever other information we want to put in ex: ratings, phone number, etc
    for (const el of results) {
      // console.log(el)
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${el.place_id}&key=${key}&fields=formatted_address,url,website,formatted_phone_number`

      const detailsResponse = await fetch(detailsUrl)
      const details = await detailsResponse.json()
      const detailsResult = details.result
      // console.log(el.photos[0].photo_reference) // THIS IS THE PROBLEM :       ^ )))))))))))


      let photoUrl = `https://i.imgflip.com/7na0pr.jpg`
      if (el.photos !== undefined) {
        photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${el.photos[0].photo_reference}&key=${key}`
      }

      let opening = false;
      if (el.opening_hours !== undefined) {
        opening = el.opening_hours.open_now;
      }


      arrayOfPlaces.push({ name: el.name, address: el.vicinity, photo_url: `${photoUrl}`, google_url: `${detailsResult.url}`, opening_hours: `${opening}`, center: [res.locals.addressLocation[0], res.locals.addressLocation[1]], coordinates: [el.geometry.location.lat, el.geometry.location.lng], distance: `${el.geometry.location.lat},${el.geometry.location.lng}`, walktime: undefined, walktime_num: undefined, ratings: el.rating, favorited: false, website_url: `${detailsResult.website}`, type: `${type}`, phone_number: `${detailsResult.formatted_phone_number}` });
    }

    // console.log(arrayOfPlaces)
    // add data to locals
    res.locals.rawData = arrayOfPlaces;
    return next();

  } catch (err) {
    console.log(err.message);
    return next({
      log: 'Express error handler caught getLocationResults middleware error',
      status: 400,
      message: { err: 'An error occurred', error: err },
    });
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

// add walking distance information to array of places, replaces lng,lat with a distance
apiController.walkingDistance = async (req, res, next) => {
  try {
    // get info for calculating distance
    const { addressLocation } = res.locals;
    const { rawData } = res.locals;
    const formattedAddressLocation = `${addressLocation[0]},${addressLocation[1]}`;

    for (let i = 0; i < rawData.length; i++) {

      const formatedPlaceLocation = rawData[i].distance

      const response = await client.directions({
        params: {
          origin: formattedAddressLocation,
          destination: formatedPlaceLocation,
          mode: 'walking',
          key: key,
        }
      })
      const distance = response.data.routes[0].legs[0].distance.text;
      const walktime = response.data.routes[0].legs[0].duration.text;
      const distanceResponse = `Distance: ${distance}`
      const walktimeResponse = `Walk-time: ${walktime}`
      rawData[i].distance = distanceResponse;
      rawData[i].walktime = walktimeResponse;

      const index = walktime.indexOf(' ');
      const walktime_num = walktime.slice(0, index);
      rawData[i].walktime_num = Number(walktime_num);
      // console.log(rawData[i].walkTimeNum);
    }
    next();
  }
  catch (e) {
    next({
      log: 'Express error handler caught walkingDistance middleware error',
      status: 400,
      message: { err: 'An error occurred', error: e },
    });
  };
};


////////////////////////////////////////////////////////////////////////////////////////////////////

// possible stretch feature: get locations near me, as opposed to inputting an address
apiController.getCurrentLocation = async (req, res, next) => {
  try {
    const response = await client.geolocate({
      params: {
        key: key,
      }
    });
    // @ts-ignore
    const { lat, lng } = response.data.location; // pulls lat and lng of current location;
    res.locals.currentLocation = [lat, lng];
    next();
  }
  catch (e) {
    next({
      log: 'Express error handler caught getCurrentLocation middleware error',
      status: 400,
      message: { err: 'An error occurred', error: e },
    });
  };
};

///////////////////////////////////////////////////////////////////////////////////////////////

//https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJJ9T2xHr8MIgRwYFHq4ZxsIQ&key=AIzaSyBUCar8WeDpZDqcnt0BjnIMMMHIbJ5wn8E&fields=formatted_address,url,website


//place details
//https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJJ9T2xHr8MIgRwYFHq4ZxsIQ&key=AIzaSyBUCar8WeDpZDqcnt0BjnIMMMHIbJ5wn8E

//place photos
// https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=AIzaSyBUCar8WeDpZDqcnt0BjnIMMMHIbJ5wn8E


module.exports = apiController;
