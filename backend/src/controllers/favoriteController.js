const Favorite = require('../models/Favorite');

const getFavorites = async (req, res) => {
    try {
        const { userId } = req.query;
        const favorites = await Favorite.find({ userId }).populate('movieId');
        res.status(200).json(favorites);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

const addFavorite = async (req, res) => {
    try {
        const { userId, movieId } = req.body;

        // Check if favorite already exists
        const existingFavorite = await Favorite.findOne({ userId, movieId });
        if (existingFavorite) return res.status(400).json({ message: 'Movie is already in favorites' });

        // Create new favorite
        const newFavorite = new Favorite({ userId, movieId });
        await newFavorite.save();

        res.status(201).json({ message: 'Movie added to favorites' });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

const removeFavorite = async (req, res) => {
    try {
        const { userId, movieId } = req.body;

        // Remove favorite
        await Favorite.findOneAndDelete({ userId, movieId });

        res.status(200).json({ message: 'Movie removed from favorites' });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getFavorites, addFavorite, removeFavorite };
