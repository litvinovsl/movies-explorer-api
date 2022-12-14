const jwt = require('jsonwebtoken');
const {
  secret,
  unauthorizedMessage,
} = require('../utils/constant');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(unauthorizedMessage);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    throw new UnauthorizedError(unauthorizedMessage);
  }

  req.user = payload;

  next(); // пропускаем запрос дальше
};
