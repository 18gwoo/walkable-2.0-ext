const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  const { id } = res.locals.user;
  res.cookie('user_id', id, { httpOnly: true });
  next();
};

module.exports = cookieController;
