const moviesRouter = require('express').Router();

const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movie');

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', postMovie);
moviesRouter.delete('/movies/:_id', deleteMovie);

module.exports = moviesRouter;
