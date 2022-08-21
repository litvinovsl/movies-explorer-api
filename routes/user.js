const usersRouter = require('express').Router();

const {
  getUserMe,
  updateUser,
} = require('../controllers/user');

usersRouter.get('/users/me', getUserMe);
usersRouter.patch('/users/me', updateUser);

module.exports = usersRouter;
