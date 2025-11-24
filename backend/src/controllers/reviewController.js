const Review = require('../models/Review');

const getReviews = async (req, res) => {
    try {
        const { movieId } = req.query;
        const reviews = await Review.find({ movieId }).populate('userId', 'username');
        res.status(200).json(reviews);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

const addReview = async (req, res) => {
    try {
        const { userId, movieId, rating, comment } = req.body;

        // Check if review already exists
        const existingReview = await Review.findOne({ userId, movieId });
        if (existingReview) return res.status(400).json({ message: 'You have already reviewed this movie' });

        // Create new review
        const newReview = new Review({ userId, movieId, rating, comment });
        await newReview.save();

        res.status(201).json({ message: 'Review added successfully' });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;                  
        await Review.findByIdAndDelete(id);
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getReviews, addReview, deleteReview };
