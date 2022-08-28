const router = require('express').Router();
const { createUser, login } = require('../controllers/user');
const auth = require('../middlewares/auth');
const usersRouter = require('./user');
const moviesRouter = require('./movie');
const errorRouter = require('./error');
const { validatorCreateUser, validatorLogin } = require('../middlewares/validator');

router.post('/signup', validatorCreateUser, createUser);
router.post('/signin', validatorLogin, login);
router.use('/', auth, usersRouter);
router.use('/', auth, moviesRouter);
router.use('*', auth, errorRouter);

module.exports = router;
