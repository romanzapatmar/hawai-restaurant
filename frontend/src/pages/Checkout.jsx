import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/api";

function Checkout() {

    const {
        cart,
        total,
        clearCart
    } = useCart();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        pincode: "",
        payment_method: "cod"
    });

    const [placingOrder, setPlacingOrder] = useState(false);
    const [error, setError] = useState("");


    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setPlacingOrder(true);

        try {
            const tableCode = localStorage.getItem("dine_in_table_code");
            const isDineIn = Boolean(tableCode);
            const orderData = {
                customer_name: formData.name,
                phone: formData.phone,
                address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
                order_type: isDineIn ? "dine_in" : "delivery",
                table_code: isDineIn ? tableCode : null,

                items: cart.map((item) => ({
                    menu_item_id: item.menu_item_id,
                    quantity: item.quantity
                }))
            };

            console.log("Sending Order:", orderData);

            const order = await createOrder(orderData);

            console.log("Order Created:", order);

            alert(
                `Order placed successfully!\n\nTracking Number: ${order.tracking_number}`
            );

            clearCart();

            navigate("/");

        } catch (err) {

            console.error("Order Error:", err);

            setError(
                err.message || "Unable to place order. Please try again."
            );

        } finally {

            setPlacingOrder(false);

        }
    };


    /* CART EMPTY */

    if (cart.length === 0) {

        return (
            <main className="checkout-page">

                <section className="checkout-hero">

                    <div className="container">

                        <span>
                            CHECKOUT
                        </span>

                        <h1>
                            Checkout
                        </h1>

                    </div>

                </section>


                <section className="section">

                    <div className="container">

                        <div className="empty-checkout">

                            <h2>
                                Your cart is empty
                            </h2>

                            <p>
                                Add some delicious food before
                                proceeding to checkout.
                            </p>

                            <Link
                                to="/menu"
                                className="checkout-primary-btn"
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
        <main className="checkout-page">

            {/* HERO */}

            <section className="checkout-hero">

                <div className="container">

                    <span>
                        COMPLETE YOUR ORDER
                    </span>

                    <h1>
                        Checkout
                    </h1>

                    <p>
                        Enter your details and place your order.
                    </p>

                </div>

            </section>


            {/* CHECKOUT */}

            <section className="section">

                <div className="container">

                    <div className="checkout-layout">

                        {/* CUSTOMER FORM */}

                        <div className="checkout-form-wrapper">

                            <h2>
                                Customer Details
                            </h2>


                            {error && (
                                <div className="checkout-error">
                                    {error}
                                </div>
                            )}


                            <form onSubmit={handleSubmit}>

                                {/* NAME */}

                                <div className="form-group">

                                    <label htmlFor="name">
                                        Full Name *
                                    </label>

                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                    />

                                </div>


                                {/* PHONE */}

                                <div className="form-group">

                                    <label htmlFor="phone">
                                        Phone Number *
                                    </label>

                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                        required
                                    />

                                </div>


                                {/* EMAIL */}

                                <div className="form-group">

                                    <label htmlFor="email">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                    />

                                </div>


                                {/* ADDRESS */}

                                <div className="form-group">

                                    <label htmlFor="address">
                                        Delivery Address *
                                    </label>

                                    <textarea
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="House number, street, area..."
                                        rows="4"
                                        required
                                    />

                                </div>


                                {/* CITY + PINCODE */}

                                <div className="form-row">

                                    <div className="form-group">

                                        <label htmlFor="city">
                                            City *
                                        </label>

                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="City"
                                            required
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label htmlFor="pincode">
                                            Pincode *
                                        </label>

                                        <input
                                            type="text"
                                            id="pincode"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            placeholder="Pincode"
                                            maxLength="6"
                                            required
                                        />

                                    </div>

                                </div>


                                {/* PAYMENT */}

                                <div className="payment-section">

                                    <h2>
                                        Payment Method
                                    </h2>


                                    <label className="payment-option">

                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="cod"
                                            checked={
                                                formData.payment_method === "cod"
                                            }
                                            onChange={handleChange}
                                        />

                                        <span>
                                            Cash on Delivery
                                        </span>

                                    </label>


                                    <label className="payment-option">

                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="online"
                                            checked={
                                                formData.payment_method === "online"
                                            }
                                            onChange={handleChange}
                                        />

                                        <span>
                                            Online Payment
                                        </span>

                                    </label>

                                </div>


                                <button
                                    type="submit"
                                    className="place-order-btn"
                                    disabled={placingOrder}
                                >

                                    {placingOrder
                                        ? "Placing Order..."
                                        : `Place Order • ₹${Number(total).toFixed(2)}`
                                    }

                                </button>

                            </form>

                        </div>


                        {/* ORDER SUMMARY */}

                        <aside className="checkout-summary">

                            <h2>
                                Your Order
                            </h2>


                            <div className="checkout-items">

                                {cart.map((item) => (

                                    <div
                                        className="checkout-item"
                                        key={item.menu_item_id}
                                    >

                                        <div>

                                            <strong>
                                                {item.name}
                                            </strong>

                                            <span>
                                                Qty: {item.quantity}
                                            </span>

                                        </div>


                                        <strong>
                                            ₹
                                            {(
                                                Number(item.price) *
                                                item.quantity
                                            ).toFixed(2)}
                                        </strong>

                                    </div>

                                ))}

                            </div>


                            <div className="checkout-summary-row">

                                <span>
                                    Subtotal
                                </span>

                                <span>
                                    ₹{Number(total).toFixed(2)}
                                </span>

                            </div>


                            <div className="checkout-summary-row">

                                <span>
                                    Delivery
                                </span>

                                <span>
                                    Free
                                </span>

                            </div>


                            <hr />


                            <div className="checkout-total">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    ₹{Number(total).toFixed(2)}
                                </strong>

                            </div>


                            <Link
                                to="/cart"
                                className="back-to-cart"
                            >
                                ← Back to Cart
                            </Link>

                        </aside>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Checkout;