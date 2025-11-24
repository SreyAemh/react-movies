const API_KEY = "ed3c3017f1bca881a2e3bf16658a4140";
const BASE_URL = "https://api.themoviedb.org/3";

const getPopularMovies = async (req, res) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        const data = await response.json();
        res.status(200).json(data.results);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
    
};  

const searchMovies = async (req, res) => {
    try {
        const { query } = req.query;
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await response.json();
        res.status(200).json(data.results);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getPopularMovies, searchMovies };
