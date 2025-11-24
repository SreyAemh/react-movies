const API_URL = import.meta.env.VITE_API_URL + '/movies';

export const getPopularMovies = async () => {
    const response = await fetch(`${API_URL}/popular`);
    const data = await response.json();
    return data;
};

export const searchMovies = async (query) => {
    const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data;
};