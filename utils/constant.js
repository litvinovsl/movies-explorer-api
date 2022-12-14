const badRequestMessage = 'Ошибка валидации';
const movieNotFoundMessage = 'Фильм не найден';
const moviesNotFoundMessage = 'Нет сохраненных фильмов';
const forbiddenErrMessage = 'Недостаточно прав для удаления фильма';
const deleteMovieMessage = 'Фильм успешно удален';
const validateErr = 'ValidationError';
const castErr = 'CastError';
const mongoServerError = 'MongoServerError';
const emailIsBusyMessage = 'Пользователь с данным Email уже зарегистрирован';
const unauthorizedMessage = 'Необходима авторизация';

const { NODE_ENV, JWT_SECRET } = process.env;
const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const allowedCors = [
  'https://api.movie.search.nomoredomains.sbs',
  'http://api.movie.search.nomoredomains.sbs',
  'http://movie.search.nomoredomains.sbs',
  'https://movie.search.nomoredomains.sbs',
  'http://localhost:3000',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  badRequestMessage,
  movieNotFoundMessage,
  moviesNotFoundMessage,
  forbiddenErrMessage,
  deleteMovieMessage,
  validateErr,
  castErr,
  mongoServerError,
  emailIsBusyMessage,
  unauthorizedMessage,
  secret,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
