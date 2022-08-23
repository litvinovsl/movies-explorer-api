const moviesRouter = require('express').Router();

const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movie');
const {
  validatorMovieId,
  validatorCreateMovie,
} = require('../middlewares/validator');

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', validatorCreateMovie, postMovie);
moviesRouter.delete('/movies/:_id', validatorMovieId, deleteMovie);

module.exports = moviesRouter;
