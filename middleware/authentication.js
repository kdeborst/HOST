//Required Dependencies
const config = require('config');
const jsonwebtoken = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No token available, authorisation denied!' });
  }

  try {
    const tkndecoded = jsonwebtoken.verify(
      token,
      config.get('jsonwebtokenSecret')
    );
    req.user = tkndecoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is invalid' });
  }
};
