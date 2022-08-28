const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  badRequestMessage,
  movieNotFoundMessage,
  forbiddenErrMessage,
  deleteMovieMessage,
  validateErr,
  castErr,
} = require('../utils/constant');

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
      if (err.name === validateErr) {
        next(new BadRequestError(`${badRequestMessage}: ${err.message}`));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(movieNotFoundMessage);
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError(forbiddenErrMessage);
      }
      return Movie.remove(movie);
    })
    .then(() => res.status(200).send({ message: deleteMovieMessage }))
    .catch((err) => {
      if (err.name === castErr) {
        next(new BadRequestError(movieNotFoundMessage));
        return;
      }
      next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};
