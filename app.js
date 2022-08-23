require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const { createUser, login } = require('./controllers/user');
const usersRouter = require('./routes/user');
const moviesRouter = require('./routes/movie');
const errorRouter = require('./routes/error');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const { errorsCentr } = require('./middlewares/errorsCentr');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  validatorCreateUser,
  validatorLogin,
} = require('./middlewares/validator');

const { PORT = 3000 } = process.env;
const app = express();

const main = async () => {
  await mongoose.connect('mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
  })
    .then(() => { console.log('Установлено соединение с БД!'); })
    .catch((err) => { console.log('Ошибка при соединении с БД!:', err); });
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors);

app.post('/signup', validatorCreateUser, createUser);
app.post('/signin', validatorLogin, login);
app.use('/', auth, usersRouter);
app.use('/', auth, moviesRouter);
app.use('*', auth, errorRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorsCentr);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

main();
