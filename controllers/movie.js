const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.postMovie = (req, res, next) => {
  const {
    country, director,
    duration, year,
    description, image,
    trailerLink, nameRU,
    nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Ошибка валидации: ${err.message}`));
        return;
      }
      console.log('tyt');
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  console.log('movie remove');

  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('У вас нет такого фильма');
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError('Недостаточно прав для удаления фильма');
      }
      return Movie.remove(movie);
    })
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('У вас нет такого фильма'));
        return;
      }
      next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch((err) => {
      if (err.name === 'CastError') {

        // throw new NotFoundError('Нет сохраненных фильмов');
      }
      next(err);
    });
};
