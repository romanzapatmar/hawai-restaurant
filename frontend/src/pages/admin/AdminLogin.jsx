import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/api";


function AdminLogin() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const data = await adminLogin(
                username,
                password
            );

            localStorage.setItem(
                "admin_logged_in",
                "true"
            );

            localStorage.setItem(
                "admin_username",
                data.username
            );

            navigate("/admin");

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "Invalid username or password"
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <main className="admin-login-page">

            <div className="admin-login-card">

                <div className="admin-login-logo">
                    Hawai Restaurant
                </div>

                <span className="admin-login-label">
                    ADMIN PANEL
                </span>

                <h1>Admin Login</h1>

                <p className="admin-login-description">
                    Login to manage restaurant orders and menu.
                </p>


                {error && (
                    <div className="admin-login-error">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    <div className="admin-form-group">

                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            placeholder="Enter username"
                            required
                        />

                    </div>


                    <div className="admin-form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter password"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="admin-login-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"
                        }
                    </button>

                </form>

            </div>

        </main>
    );
}


export default AdminLogin;