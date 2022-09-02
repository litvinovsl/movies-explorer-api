const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

const {
  mongoServerError,
  badRequestMessage,
  validateErr,
  emailIsBusyMessage,
  secret,
} = require('../utils/constant');

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === mongoServerError) {
        next(new ConflictError(emailIsBusyMessage));
        return;
      }
      if (err.name === validateErr) {
        next(new BadRequestError(badRequestMessage));
        return;
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((data) => {
      res.status(201).send({
        name: data.name,
        _id: data._id,
        email: data.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(emailIsBusyMessage));
        return;
      }

      if (err.name === validateErr) {
        next(new BadRequestError(badRequestMessage));
        return;
      }
      next(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
};
