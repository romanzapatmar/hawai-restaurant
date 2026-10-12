import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
    const { cart } = useCart();

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <header className="site-header">
            <div className="container header-inner">

                <Link to="/" className="logo">
                    HAWAI
                </Link>

                <nav className="main-nav">
                    <Link to="/">Home</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </nav>

                <Link to="/cart" className="cart-button">
                    🛒 Cart
                    {cartCount > 0 && (
                        <span className="cart-count">
                            {cartCount}
                        </span>
                    )}
                </Link>

            </div>
        </header>
    );
}

export default Header;