import { useState } from "react";
import { registerUser } from "../services/authService";
import "../css/Register.css";   

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        try {
            await registerUser({ username, email, password });
            // Redirect or show success message
        } catch (err) {
            console.log(err);
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register">
            <h2>Register</h2><br />
            <form onSubmit={handleRegister} className="register-form">
                <input
                    type="text"
                    placeholder="Username"
                    className="register-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br /><br />
                <input
                    type="email"
                    placeholder="Email"
                    className="register-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br /><br />
                <input
                    type="password"
                    placeholder="Password"
                    className="register-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br /><br />
                <button type="submit" className="register-button" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );

}

export default Register;
