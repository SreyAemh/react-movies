import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useUserContext } from "../contexts/UserContext";
import "../css/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { addUser } = useUserContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (loading) return;
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }   
        setLoading(true);
        try {
            const response = await loginUser({ email, password });
            
            // Destructure safely
            const { token, user } = response || {};

            // Update context
            addUser({
                token,
                isAdmin: user?.isAdmin || false,
                username: user?.username || "",
                email: user?.email || ""
            });

            setError(null); // Clear any previous error
            window.location.href = "/";
            

        } catch (err) {
            console.log(err);
            setError("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <h2>Login</h2><br />
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br /><br />
                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br /><br />
                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button><br /><br />
                <Link to="/register" className="nav-link">Don't have an account? Register</Link>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default Login;
