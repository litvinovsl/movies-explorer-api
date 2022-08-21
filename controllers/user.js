const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send('Нет пользователя с таким id');
        // throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(403).send('Ошибка валидации');
        // next(new BadRequestError('Ошибка валидации'));
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
        res.status(401).send('Email занят');
        // next(new ConflictError('Email занят'));
        return;
      }

      if (err.name === 'ValidationError') {
        res.status(403).send('Ошибка валидации');
        // next(new BadRequestError('Ошибка валидации'));
        return;
      }
      next(err);
    })
    .catch(next);
};
