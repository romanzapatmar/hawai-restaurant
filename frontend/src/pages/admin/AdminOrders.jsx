import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getOrders,
    updateOrderStatus
} from "../../services/api";


function AdminOrders() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [updatingOrder, setUpdatingOrder] =
        useState(null);


    const username =
        localStorage.getItem("admin_username");


    const loadOrders = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getOrders();

            setOrders(Array.isArray(data) ? data : []);

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "Failed to load orders"
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadOrders();

    }, []);


    const handleStatusChange = async (
        orderId,
        status
    ) => {

        try {

            setUpdatingOrder(orderId);
            setError("");

            const updatedOrder =
                await updateOrderStatus(
                    orderId,
                    status
                );

            setOrders((currentOrders) =>
                currentOrders.map((order) =>
                    order.id === orderId
                        ? updatedOrder
                        : order
                )
            );

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "Failed to update status"
            );

        } finally {

            setUpdatingOrder(null);

        }
    };


    const handleLogout = () => {

        localStorage.removeItem(
            "admin_logged_in"
        );

        localStorage.removeItem(
            "admin_username"
        );

        navigate("/admin/login");

    };


    const getItemsCount = (order) => {

        return order.items?.reduce(
            (total, item) =>
                total + item.quantity,
            0
        ) || 0;

    };


    if (loading) {

        return (
            <main className="admin-page">

                <div className="admin-content">

                    <h2>
                        Loading orders...
                    </h2>

                </div>

            </main>
        );
    }


    return (
        <main className="admin-page">

            {/* SIDEBAR */}

            <aside className="admin-sidebar">

                <div className="admin-brand">
                    Hawai Restaurant
                </div>


                <div className="admin-menu">

                    <button
                        onClick={() =>
                            navigate("/admin")
                        }
                    >
                        Dashboard
                    </button>


                    <button
                        className="admin-menu-active"
                        onClick={() =>
                            navigate("/admin/orders")
                        }
                    >
                        Orders
                    </button>


                    <button
                        onClick={() =>
                            navigate("/admin/menu")
                        }
                    >
                        Menu
                    </button>

                </div>


                <button
                    className="admin-logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </aside>


            {/* CONTENT */}

            <section className="admin-content">

                <header className="admin-header">

                    <div>

                        <span>
                            ADMIN PANEL
                        </span>

                        <h1>
                            Orders
                        </h1>

                    </div>


                    <div className="admin-user">
                        👤 {username}
                    </div>

                </header>


                {error && (
                    <div className="admin-error">
                        {error}
                    </div>
                )}

                <div className="admin-orders-header">

                    <div>
                        <strong>
                            {orders.length}
                        </strong>

                        <span>
                            Total Orders
                        </span>
                    </div>


                    <button
                        type="button"
                        onClick={loadOrders}
                        className="refresh-orders-btn"
                    >
                        ↻ Refresh
                    </button>

                </div>


                {orders.length === 0 ? (

                    <div className="admin-section">

                        <div className="admin-empty">
                            No orders found.
                        </div>

                    </div>

                ) : (

                    <div className="admin-orders-list">

                        {orders
                            .slice()
                            .reverse()
                            .map((order) => (

                                <div
                                    className="admin-order-card"
                                    key={order.id}
                                >

                                    {/* ORDER HEADER */}

                                    <div className="admin-order-top">

                                        <div>

                                            <h2>
                                                Order #{order.id}
                                            </h2>

                                            <span className="tracking-number">
                                                {
                                                    order.tracking_number
                                                }
                                            </span>

                                        </div>


                                        <span
                                            className={`order-status status-${order.status}`}
                                        >
                                            {(order.status || "pending").replace(
                                                /_/g,
                                                " "
                                            )}
                                        </span>

                                    </div>

                                    {/* ORDER TYPE */}
                                    <div className="admin-order-type">
                                        {order.order_type === "dine_in" ? (
                                            <p>
                                                <strong>Order Type:</strong> Dine-in
                                                {" · "}
                                                <strong>Table:</strong>{" "}
                                                {order.table_number ?? "N/A"}
                                            </p>
                                        ) : (
                                            <p>
                                                <strong>Order Type:</strong>{" "}
                                                {order.order_type || "Delivery"}
                                            </p>
                                        )}
                                    </div>

                                    {/* CUSTOMER */}

                                    <div className="admin-order-customer">

                                        <div>

                                            <span>
                                                Customer
                                            </span>

                                            <strong>
                                                {
                                                    order.customer_name
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Phone
                                            </span>

                                            <strong>
                                                {order.phone}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Address
                                            </span>

                                            <strong>
                                                {
                                                    order.address ||
                                                    "Not provided"
                                                }
                                            </strong>

                                        </div>

                                    </div>


                                    {/* ITEMS */}

                                    <div className="admin-order-items">

                                        <h3>
                                            Order Items
                                        </h3>


                                        {order.items?.map(
                                            (item) => (

                                                <div
                                                    className="admin-order-item"
                                                    key={item.id}
                                                >

                                                    <div>

                                                        <strong>
                                                            Menu Item #
                                                            {
                                                                item.menu_item_id
                                                            }
                                                        </strong>

                                                        <span>
                                                            Qty: {
                                                                item.quantity
                                                            }
                                                        </span>

                                                    </div>


                                                    <strong>
                                                        ₹
                                                        {(
                                                            Number(
                                                                item.price
                                                            ) *
                                                            item.quantity
                                                        ).toFixed(2)}
                                                    </strong>

                                                </div>

                                            )
                                        )}

                                    </div>


                                    {/* FOOTER */}

                                    <div className="admin-order-bottom">

                                        <div className="admin-order-total">

                                            <span>
                                                {getItemsCount(order)}
                                                {" "}
                                                Items
                                            </span>

                                            <strong>
                                                ₹
                                                {Number(
                                                    order.total_amount
                                                ).toFixed(2)}
                                            </strong>

                                        </div>


                                        <div className="admin-status-control">

                                            <label>
                                                Update Status
                                            </label>


                                            <select
                                                value={order.status || "pending"}
                                                disabled={
                                                    updatingOrder ===
                                                    order.id
                                                }
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        order.id,
                                                        e.target.value
                                                    )
                                                }
                                            >

                                                <option value="pending">
                                                    Pending
                                                </option>

                                                <option value="confirmed">
                                                    Confirmed
                                                </option>

                                                <option value="preparing">
                                                    Preparing
                                                </option>

                                                <option value="ready">
                                                    Ready
                                                </option>

                                                <option value="out_for_delivery">
                                                    Out for Delivery
                                                </option>

                                                <option value="delivered">
                                                    Delivered
                                                </option>

                                                <option value="cancelled">
                                                    Cancelled
                                                </option>

                                            </select>


                                            {updatingOrder ===
                                                order.id && (
                                                    <small>
                                                        Updating...
                                                    </small>
                                                )}

                                        </div>

                                    </div>

                                </div>

                            ))}

                    </div>

                )}

            </section>

        </main>
    );
}


export default AdminOrders;
