const express = require('express');

const { addReview, getReviews, deleteReview } = require('../controllers/reviewController');

const reviewRouter = express.Router();

reviewRouter.post('/', addReview);
reviewRouter.get('/', getReviews);
reviewRouter.delete('/:id', deleteReview);

module.exports = reviewRouter;
