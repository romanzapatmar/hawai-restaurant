import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getOrders,
    getAdminMenuItems,
    getAdminCategories
} from "../../services/api";


function AdminDashboard() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const username =
        localStorage.getItem("admin_username");


    useEffect(() => {

        async function loadDashboard() {

            try {

                setLoading(true);
                setError("");

                const [
                    ordersData,
                    menuData,
                    categoriesData
                ] = await Promise.all([

                    getOrders(),

                    getAdminMenuItems(),

                    getAdminCategories()

                ]);

                setOrders(ordersData);
                setMenuItems(menuData);
                setCategories(categoriesData);

            } catch (err) {

                console.error(err);

                setError(
                    err.message ||
                    "Failed to load dashboard data"
                );

            } finally {

                setLoading(false);

            }
        }


        loadDashboard();

    }, []);


    const today = new Date()
        .toISOString()
        .split("T")[0];


    /*
     * Total orders
     */
    const totalOrders = orders.length;


    /*
     * Pending orders
     */
    const pendingOrders = orders.filter(
        (order) =>
            order.status === "pending"
    ).length;


    /*
     * Today's orders
     *
     * Note:
     * Currently API response does not contain
     * created_at, so today's count cannot be
     * calculated accurately from the current
     * OrderResponse.
     */
    const todaysOrders = 0;


    /*
     * Total revenue
     */
    const totalRevenue = orders.reduce(
        (sum, order) =>
            sum + Number(order.total_amount || 0),
        0
    );


    /*
     * Available menu items
     */
    const availableItems = menuItems.filter(
        (item) => item.is_available
    ).length;


    /*
     * Category name
     */
    const getCategoryName = (categoryId) => {

        const category = categories.find(
            (cat) => cat.id === categoryId
        );

        return category
            ? category.name
            : "Uncategorized";
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


    if (loading) {

        return (
            <main className="admin-page">

                <div className="admin-content">

                    <h2>Loading dashboard...</h2>

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
                            Dashboard
                        </h1>

                    </div>


                    <div className="admin-user">
                        👤 {username}
                    </div>

                </header>


                {/* ERROR */}

                {error && (
                    <div className="admin-error">
                        {error}
                    </div>
                )}


                {/* STATS */}

                <div className="admin-stats">

                    <div className="admin-stat-card">

                        <span>
                            Total Orders
                        </span>

                        <strong>
                            {totalOrders}
                        </strong>

                    </div>


                    <div className="admin-stat-card">

                        <span>
                            Pending Orders
                        </span>

                        <strong>
                            {pendingOrders}
                        </strong>

                    </div>


                    <div className="admin-stat-card">

                        <span>
                            Today's Orders
                        </span>

                        <strong>
                            {todaysOrders}
                        </strong>

                    </div>


                    <div className="admin-stat-card">

                        <span>
                            Total Revenue
                        </span>

                        <strong>
                            ₹{totalRevenue.toFixed(2)}
                        </strong>

                    </div>

                </div>


                {/* MENU STATS */}

                <div className="admin-stats admin-menu-stats">

                    <div className="admin-stat-card">

                        <span>
                            Total Menu Items
                        </span>

                        <strong>
                            {menuItems.length}
                        </strong>

                    </div>


                    <div className="admin-stat-card">

                        <span>
                            Available Items
                        </span>

                        <strong>
                            {availableItems}
                        </strong>

                    </div>


                    <div className="admin-stat-card">

                        <span>
                            Categories
                        </span>

                        <strong>
                            {categories.length}
                        </strong>

                    </div>

                </div>


                {/* RECENT ORDERS */}

                <div className="admin-section">

                    <div className="admin-section-header">

                        <h2>
                            Recent Orders
                        </h2>

                        <button
                            onClick={() =>
                                navigate("/admin/orders")
                            }
                        >
                            View All
                        </button>

                    </div>


                    {orders.length === 0 ? (

                        <div className="admin-empty">
                            No orders found.
                        </div>

                    ) : (

                        <div className="admin-table-wrapper">

                            <table className="admin-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Order
                                        </th>

                                        <th>
                                            Customer
                                        </th>

                                        <th>
                                            Phone
                                        </th>

                                        <th>
                                            Items
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {orders
                                        .slice()
                                        .reverse()
                                        .slice(0, 5)
                                        .map((order) => (

                                            <tr
                                                key={order.id}
                                            >

                                                <td>
                                                    <strong>
                                                        #{order.id}
                                                    </strong>

                                                    <small>
                                                        {
                                                            order.tracking_number
                                                        }
                                                    </small>
                                                </td>


                                                <td>
                                                    {
                                                        order.customer_name
                                                    }
                                                </td>


                                                <td>
                                                    {order.phone}
                                                </td>


                                                <td>
                                                    {
                                                        order.items
                                                            ?.reduce(
                                                                (
                                                                    total,
                                                                    item
                                                                ) =>
                                                                    total +
                                                                    item.quantity,
                                                                0
                                                            )
                                                    }
                                                </td>


                                                <td>
                                                    ₹
                                                    {Number(
                                                        order.total_amount
                                                    ).toFixed(2)}
                                                </td>


                                                <td>

                                                    <span
                                                        className={`order-status status-${order.status}`}
                                                    >
                                                        {
                                                            order.status
                                                        }
                                                    </span>

                                                </td>

                                            </tr>

                                        ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>


                {/* MENU ITEMS */}

                <div className="admin-section">

                    <div className="admin-section-header">

                        <h2>
                            Menu Items
                        </h2>

                        <button
                            onClick={() =>
                                navigate("/admin/menu")
                            }
                        >
                            Manage Menu
                        </button>

                    </div>


                    {menuItems.length === 0 ? (

                        <div className="admin-empty">
                            No menu items found.
                        </div>

                    ) : (

                        <div className="admin-table-wrapper">

                            <table className="admin-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Item
                                        </th>

                                        <th>
                                            Category
                                        </th>

                                        <th>
                                            Price
                                        </th>

                                        <th>
                                            Type
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {menuItems
                                        .slice(0, 10)
                                        .map((item) => (

                                            <tr
                                                key={item.id}
                                            >

                                                <td>

                                                    <strong>
                                                        {item.name}
                                                    </strong>

                                                    {item.description && (
                                                        <small>
                                                            {
                                                                item.description
                                                            }
                                                        </small>
                                                    )}

                                                </td>


                                                <td>
                                                    {
                                                        getCategoryName(
                                                            item.category_id
                                                        )
                                                    }
                                                </td>


                                                <td>
                                                    ₹
                                                    {Number(
                                                        item.price
                                                    ).toFixed(2)}
                                                </td>


                                                <td>

                                                    {item.is_vegetarian
                                                        ? "Vegetarian"
                                                        : "Non-Veg"}

                                                </td>


                                                <td>

                                                    <span
                                                        className={
                                                            item.is_available
                                                                ? "menu-available"
                                                                : "menu-unavailable"
                                                        }
                                                    >
                                                        {item.is_available
                                                            ? "Available"
                                                            : "Unavailable"}
                                                    </span>

                                                </td>

                                            </tr>

                                        ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </section>

        </main>
    );
}


export default AdminDashboard;