const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true, 
            trim: true
        },
        description: { 
            type: String, 
            required: true 
        },
        releaseDate: { 
            type: Date 
        },
        genre: { 
            type: [String] 
        },
        director: { 
            type: String 
        },
        cast: { 
            type: [String] 
        },
        rating: { 
            type: Number, 
            min: 0, 
            max: 10 
        },
        posterUrl: { 
            type: String 
        },
    },
    { timestamps: true }
);  