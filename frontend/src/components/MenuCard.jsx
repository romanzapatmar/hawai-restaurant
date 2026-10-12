import { useCart } from "../context/CartContext";

function MenuCard({ item }) {

    const { addToCart } = useCart();

    return (
        <div className="menu-card">

            <div className="menu-image">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.name}
                    />
                ) : (
                    <span>🍕</span>
                )}
            </div>

            <div className="menu-card-content">

                <div className="menu-title-row">

                    <h3>{item.name}</h3>

                    {item.is_vegetarian && (
                        <span className="veg-badge">
                            VEG
                        </span>
                    )}

                </div>

                <p className="menu-description">
                    {item.description}
                </p>

                <div className="menu-card-bottom">

                    <strong>
                        ₹{item.price}
                    </strong>

                    <button
                        className="add-cart-btn"
                        onClick={() => addToCart(item)}
                        disabled={!item.is_available}
                    >
                        {item.is_available
                            ? "Add to Cart"
                            : "Unavailable"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default MenuCard;