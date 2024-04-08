const db = require('../models/favorites');
const favoriteController = {};
const moment = require('moment')
// add a place to favorites db

// INSERT INTO Favorites (name,address,photo,url,phone_number,opening_hours,ratings,distance,types,walktime,walktime_num,created_at,deleted_at,user_id)
//VALUES ('popeyes','123 front st','google.com','yahoo.com','607-687-0755','monday-friday','5','10','thai','walkingtime: 20min',20,'2023-06-11','2023-06-10',1)

favoriteController.addFavorite = async (req, res, next) => {
  try {
    const { name,google_url,website_url, photo_url,address,phone_number,opening_hours,ratings,distance,type,walktime,walktime_num  } = req.body;
    console.log(req.body)
    const {user_id} = req.cookies;
    const favorited = true;
    const created_at = moment().format('YYYY-MM-DD');
    const query = {text: `INSERT INTO Favorites (name,address,photo_url,google_url,website_url,phone_number,opening_hours,ratings,distance,type,walktime,walktime_num,created_at,user_id,favorited)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15) RETURNING *`, values: [name,address,photo_url,google_url, website_url,phone_number,opening_hours,ratings,distance,type,walktime,walktime_num,created_at,user_id, favorited]}
    const response = await db.query(query);
    // const getAllQuery = {text:`SELECT * FROM Favorites WHERE user_id = $1`,values: [user_id]};
    // const getAllresponse = await db.query(getAllQuery);
    // const arrOfObjs = getAllresponse.rows;
    // res.locals.data = arrOfObjs;
    // console.log('Successfully Inserted!');
   next();
  } catch (e) {
    next({
      log: `Something wrong with addFavorite middleware, error: ${e}`,
      status: 400,
      message: { err: 'Problem in addFavorite middleware' },
    });
  }
};
// delete a place from favorites db

favoriteController.deleteFavorite = async (req, res, next) => {
  try {
    const { name} = req.body;
    const {user_id} = req.cookies;
    const query = {text: `DELETE FROM Favorites WHERE name = $1 AND user_id = $2`, values: [name,user_id]};
    await db.query(query);
    console.log('Deleted Successfully!');
    // const getAllQuery = {text:`SELECT * FROM Favorites WHERE user_id = $1`,values: [user_id]};
    // const getAllresponse = await db.query(getAllQuery);
    // const arrOfObjs = getAllresponse.rows;
    // res.locals.data = arrOfObjs;
    next();
  } catch (e) {
    next({
      log: `Something wrong with deleteFavorite middleware, error: ${e}`,
      status: 400,
      message: { err: 'Problem in deleteFavorite middleware' },
    });
  }
}
// get all places from favorites db
//this needs to be used in other areas as well
favoriteController.getAllFavorites = async (req, res, next) => {
    try {
    const {user_id} = req.cookies;
    const query = {text:`SELECT * FROM Favorites WHERE user_id = $1`,values: [user_id]};
    const response = await db.query(query);
    const arrOfObjs = response.rows;
    res.locals.data = arrOfObjs;
    console.log(res.locals.data);
    next();
    }
    catch (e) {
        console.log(e);
        next({
          log: `Something wrong with getAllFavorites middleware, error: ${e}`,
          status: 400,
          message: { err: 'Problem in getAllFavorites middleware' },
        });
    }
};
// compares res.locals.rawData to database, adds a boolean property to rawData of whether item exists in database
favoriteController.checkDatabase = async (req, res, next) => {
    try {
    const {user_id} = req.cookies;
    const { rawData } = res.locals;
        for (let i = 0; i < rawData.length; i++) {
          const {name} = rawData[i]
          // console.log('name: ', name)
            const query = {
            text: `SELECT * FROM Favorites WHERE name = $1 AND user_id = $2`,
            values: [name, user_id],
            }
            const response = await db.query(query);
            rawData[i].favorited = response.rows.length !== 0;
        };
        // console.log(rawData);
        next();
    }
    catch (e) {
        console.log(e);
        next({
          log: `Something wrong with favorite checkDatabase middleware, error: ${e}`,
          status: 400,
          message: { err: 'Problem in favorite checkDatabase middleware' },
        })
    }
};
// INSERT INTO Favorites (name,address,photo,url,phone_number,opening_hours,ratings,distance,types,walktime,walktime_num,created_at,deleted_at,user_id)
//VALUES ('popeyes','123 front st','google.com','yahoo.com','607-687-0755','monday-friday','5','10','thai','walkingtime: 20min',20,'2023-06-11','2023-06-10',1)


module.exports = favoriteController;