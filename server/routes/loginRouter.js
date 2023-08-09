const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');
const cookieController = require('../controllers/cookieController');

router.post(
  '/signup',
  loginController.signUp,
  cookieController.setCookie,
  (req, res) => {
    res.status(201).json({ data: res.locals.user });
  }
);

router.post(
  '/login',
  loginController.login,
  cookieController.setCookie,
  (req, res) => {
    res.status(200).json({ data: res.locals.user });
  }
);

module.exports = router;
