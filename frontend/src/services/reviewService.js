import axios from 'axios';
const API_URL = 'http://localhost:4000/api/reviews';

export const createReview = async (movieId, reviewData) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/create`, { movieId, ...reviewData }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const getReviews = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const updateReview = async (reviewId, updatedData) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/update/${reviewId}`, updatedData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const deleteReview = async (reviewId) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/delete/${reviewId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};  


