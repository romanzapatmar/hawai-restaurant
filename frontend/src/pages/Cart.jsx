import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {

    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        total
    } = useCart();


    if (cart.length === 0) {

        return (
            <main className="cart-page">

                <section className="cart-hero">
                    <div className="container">
                        <span>YOUR ORDER</span>

                        <h1>
                            Your Cart
                        </h1>

                        <p>
                            Review your selected items before checkout.
                        </p>
                    </div>
                </section>


                <section className="section">

                    <div className="container">

                        <div className="empty-cart">

                            <div className="empty-cart-icon">
                                🛒
                            </div>

                            <h2>
                                Your cart is empty
                            </h2>

                            <p>
                                Looks like you haven't added anything
                                to your cart yet.
                            </p>

                            <Link
                                to="/menu"
                                className="btn btn-primary"
                            >
                                Browse Menu
                            </Link>

                        </div>

                    </div>

                </section>

            </main>
        );
    }


    return (
        <main className="cart-page">

            {/* HERO */}

            <section className="cart-hero">

                <div className="container">

                    <span>
                        YOUR ORDER
                    </span>

                    <h1>
                        Your Cart
                    </h1>

                    <p>
                        Review your selected items before checkout.
                    </p>

                </div>

            </section>


            {/* CART */}

            <section className="section">

                <div className="container">

                    <div className="cart-layout">

                        {/* CART ITEMS */}

                        <div className="cart-items">

                            <div className="cart-header">

                                <h2>
                                    Your Items
                                </h2>

                                <button
                                    type="button"
                                    className="clear-cart-btn"
                                    onClick={clearCart}
                                >
                                    Clear Cart
                                </button>

                            </div>


                            {cart.map((item) => (

                                <div
                                    className="cart-item"
                                    key={item.menu_item_id}
                                >

                                    {/* IMAGE */}

                                    <div className="cart-item-image">

                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                            />
                                        ) : (
                                            <div className="no-image">
                                                🍕
                                            </div>
                                        )}

                                    </div>


                                    {/* DETAILS */}

                                    <div className="cart-item-details">

                                        <h3>
                                            {item.name}
                                        </h3>

                                        <p className="cart-item-price">
                                            ₹{Number(item.price).toFixed(2)}
                                        </p>


                                        {/* QUANTITY */}

                                        <div className="quantity-control">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    decreaseQuantity(
                                                        item.menu_item_id
                                                    )
                                                }
                                            >
                                                −
                                            </button>

                                            <span>
                                                {item.quantity}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    increaseQuantity(
                                                        item.menu_item_id
                                                    )
                                                }
                                            >
                                                +
                                            </button>

                                        </div>

                                    </div>


                                    {/* ITEM TOTAL */}

                                    <div className="cart-item-right">

                                        <strong>
                                            ₹
                                            {(
                                                Number(item.price) *
                                                item.quantity
                                            ).toFixed(2)}
                                        </strong>

                                        <button
                                            type="button"
                                            className="remove-item"
                                            onClick={() =>
                                                removeFromCart(
                                                    item.menu_item_id
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>


                        {/* SUMMARY */}

                        <aside className="cart-summary">

                            <h2>
                                Order Summary
                            </h2>


                            <div className="summary-row">

                                <span>
                                    Subtotal
                                </span>

                                <span>
                                    ₹{Number(total).toFixed(2)}
                                </span>

                            </div>


                            <div className="summary-row">

                                <span>
                                    Delivery
                                </span>

                                <span>
                                    Free
                                </span>

                            </div>


                            <hr />


                            <div className="summary-total">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    ₹{Number(total).toFixed(2)}
                                </strong>

                            </div>


                            <Link
                                to="/checkout"
                                className="checkout-btn"
                            >
                                Proceed to Checkout
                            </Link>


                            <Link
                                to="/menu"
                                className="continue-shopping"
                            >
                                ← Continue Shopping
                            </Link>

                        </aside>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Cart;