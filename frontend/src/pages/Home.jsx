import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/movieService";
import { useUserContext } from "../contexts/UserContext";
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useUserContext();
    const isLoggedIn = user !== null;
    const username = user?.username;


    // Load popular movies on initial render
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            } finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }
    };

    return <div className="home">
        <h1 className="home-title">Welcome to Movie App</h1>
        {isLoggedIn && <p className="home-subtitle">Explore your favorite movies</p>}
        <p className="home-description">Search for movies, add to favorites, and more!</p>
        <br /><br />
        {isLoggedIn && <p className="home-welcome">Hello, {username}!</p>}
        <br /><br />
        
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                placeholder="Search for movies..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? 
            <div className="loading">Loading...</div> 
            : 
            <div className="movies-grid">
                {movies.map(movie =>
                    <MovieCard movie={movie} key={movie.id} />
                )}
            </div>
        }

        <div className="movies-grid">
            {movies.map(movie =>
                <MovieCard movie={movie} key={movie.id} />
            )}
        </div>
    </div>
}

export default Home