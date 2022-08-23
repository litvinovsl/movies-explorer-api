const usersRouter = require('express').Router();

const {
  valdatorUpdateProfile,
} = require('../middlewares/validator');

const {
  getUserMe,
  updateUser,
} = require('../controllers/user');

usersRouter.get('/users/me', getUserMe);
usersRouter.patch('/users/me', valdatorUpdateProfile, updateUser);

module.exports = usersRouter;
