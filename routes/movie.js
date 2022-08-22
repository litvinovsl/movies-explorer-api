const moviesRouter = require('express').Router();

const {
  getSaveMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movie');

moviesRouter.get('/movies', getSaveMovies);
moviesRouter.post('/movies', postMovie);
moviesRouter.delete('/movies/_id', deleteMovie);

module.exports = moviesRouter;
