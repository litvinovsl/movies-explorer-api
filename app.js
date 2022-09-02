require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const { dataMovies, PORT } = require('./utils/config');
const cors = require('./middlewares/cors');
const { errorsCentr } = require('./middlewares/errorsCentr');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const main = async () => {
  await mongoose.connect(dataMovies, {
    useNewUrlParser: true,
  })
    .then(() => { console.log('Установлено соединение с БД!'); })
    .catch((err) => { console.log('Ошибка при соединении с БД!:', err); });
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorsCentr);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

main();
