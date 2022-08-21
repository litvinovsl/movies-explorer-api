const usersRouter = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/user');

usersRouter.get('/users/me', getUser);
usersRouter.patch('/users/me', updateUser);

module.exports = usersRouter;
