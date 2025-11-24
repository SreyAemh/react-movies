const express = require('express');

const { getPopularMovies, searchMovies } = require('../controllers/movieController');

const movieRouter = express.Router();

movieRouter.get('/popular', getPopularMovies);
movieRouter.get('/search', searchMovies);

module.exports = movieRouter;
