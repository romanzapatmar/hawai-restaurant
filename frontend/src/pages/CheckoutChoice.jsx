import { useNavigate } from "react-router-dom";

function CheckoutChoice() {
    const navigate = useNavigate();

    return (
        <div className="checkout-choice-page">
            <div className="checkout-choice-card">
                <div className="checkout-choice-icon">🍽️</div>

                <h1>Almost there!</h1>

                <p>
                    How would you like to continue with your
                    Hawai Restaurant order?
                </p>

                <button
                    className="checkout-choice-guest"
                    onClick={() => navigate("/checkout/details")}
                >
                    Continue as Guest
                </button>

                <button
                    className="checkout-choice-login"
                    onClick={() => navigate("/login")}
                >
                    Login / Sign Up
                </button>

                <button
                    className="checkout-choice-back"
                    onClick={() => navigate("/cart")}
                >
                    ← Back to Cart
                </button>

                <small>
                    No account? No problem. You can order as a guest.
                </small>
            </div>
        </div>
    );
}

export default CheckoutChoice;
