import { Link } from "react-router-dom";
import "../css/Navbar.css"
import { useUserContext } from "../contexts/UserContext";

function NavBar() {
    const { user, removeUser } = useUserContext();
    const isLoggedIn = user !== null;
    const isAdmin = user?.isAdmin === true;

    const handleLogout = () => {
        removeUser();
        // window.location.href = "/login"; // Redirect to login page
    };
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Movie App</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                {isLoggedIn && <Link to="/favorites" className="nav-link">Favorites</Link>}
                {isLoggedIn ? (
                    <>
                        {isAdmin && <Link to="/admin" className="nav-link">Admin</Link>}
                        <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="nav-link">Login</Link>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
