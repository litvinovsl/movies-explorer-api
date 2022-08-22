const Movie = require('../models/movie');

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
        console.log(err.message);
        // next(new BadRequestError('Ошибка валидации'));
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
        console.log('!movie');
        // throw new NotFoundError('Карточки не существует');
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        console.log('Недостаточно прав для удаления карточки');
        // throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }
      return Movie.remove(movie);
    })
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        // next(new BadRequestError('Карточки не существует'));
        return;
      }
      next(err);
    });
};
