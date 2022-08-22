const badRequestMessage = 'Ошибка валидации';
const movieNotFoundMessage = 'Фильм не найден';
const moviesNotFoundMessage = 'Нет сохраненных фильмов';
const forbiddenErrMessage = 'Недостаточно прав для удаления фильма';
const deleteMovieMessage = 'Фильм успешно удален';
const validateErr = 'ValidationError';
const castErr = 'CastError';
const emailIsBusyMessage = 'Пользователь с данным Email уже зарегистрирован';
const unauthorizedMessage = 'Необходима авторизация';

const { NODE_ENV, JWT_SECRET } = process.env;
const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = {
  badRequestMessage,
  movieNotFoundMessage,
  moviesNotFoundMessage,
  forbiddenErrMessage,
  deleteMovieMessage,
  validateErr,
  castErr,
  emailIsBusyMessage,
  unauthorizedMessage,
  secret,
};
