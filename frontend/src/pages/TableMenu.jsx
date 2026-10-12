import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategories, getMenuItems } from "../services/api";
import { useCart } from "../context/CartContext";

const API_BASE_URL = "http://127.0.0.1:8001";

function TableMenu() {
    const { tableCode } = useParams();
    const navigate = useNavigate();
    const { addToCart, cart } = useCart();

    const [table, setTable] = useState(null);
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadPage() {
            try {
                const tableResponse = await fetch(
                    `${API_BASE_URL}/api/tables/public/${tableCode}`
                );

                const tableData = await tableResponse.json();

                if (!tableResponse.ok) {
                    throw new Error(
                        tableData.detail || "Invalid table URL"
                    );
                }

                const [menuItems, menuCategories] = await Promise.all([
                    getMenuItems(),
                    getCategories()
                ]);

                if (cancelled) return;

                setTable(tableData);
                setItems(menuItems.filter(item => item.is_available));
                setCategories(menuCategories);

                // Keep the table selection while customer browses.
                localStorage.setItem("dine_in_table_code", tableCode);
                localStorage.setItem(
                    "dine_in_table_number",
                    String(tableData.table_number)
                );
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadPage();

        return () => {
            cancelled = true;
        };
    }, [tableCode]);

    if (loading) return <div className="container"><p>Loading menu...</p></div>;

    if (error) {
        return (
            <div className="container">
                <h2>Unable to open this table</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container table-menu-page">
            <header className="table-menu-header">
                <p>Hawai Restaurant · Dine-in</p>
                <h1>Welcome to Table {table.table_number}</h1>
                <p>Choose your food and place your order at this table.</p>
            </header>

            {categories.map(category => {
                const categoryItems = items.filter(
                    item => item.category_id === category.id
                );

                if (!categoryItems.length) return null;

                return (
                    <section key={category.id} className="table-menu-category">
                        <h2>{category.name}</h2>

                        <div className="menu-grid">
                            {categoryItems.map(item => (
                                <article className="menu-card" key={item.id}>
                                    <div className="menu-image">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                            />
                                        ) : (
                                            <span>🍽️</span>
                                        )}
                                    </div>

                                    <div className="menu-card-content">
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                        <strong>₹{item.price}</strong>

                                        <button
                                            type="button"
                                            onClick={() => addToCart(item)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                );
            })}

            <button
                className="checkout-choice-guest"
                type="button"
                onClick={() => navigate("/cart")}
            >
                View Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
        </div>
    );
}

export default TableMenu;
