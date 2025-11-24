const express = require('express');

const { addFavorite, removeFavorite, getFavorites } = require('../controllers/favoriteController');

const favoriteRouter = express.Router();

favoriteRouter.post('/', addFavorite);
favoriteRouter.delete('/', removeFavorite);
favoriteRouter.get('/', getFavorites);

module.exports = favoriteRouter;
