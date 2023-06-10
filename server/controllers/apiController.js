const { resourceLimits } = require("worker_threads");

const apiController = {};
// API's
// https://developers.google.com/maps/documentation/javascript/places
// https://developers.google.com/maps/documentation/places/web-service

// 
const key = process.env.GOOGLE_API_KEY
apiController.getLocationResults = async (req, res, next) => {
  try {
    // { }
    const input = 'Burgers'
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${input}&type=restaurant&key=${key}`)
    const data = await response.json();
    const results = data.results;

        const arrayOfPlaces = [];
        results.forEach(el => {
            arrayOfPlaces.push(el.name);
        })

    console.log(arrayOfPlaces);
    res.locals.rawData = arrayOfPlaces;
    return next()
    } 
  catch (err) {
   console.log(err);
   return next({ log: `error in getLocationResults middleware. Error: ${err}`})
 }
} 




module.exports = apiController;