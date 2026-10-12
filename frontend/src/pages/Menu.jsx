import { useEffect, useState } from "react";

import MenuCard from "../components/MenuCard";


import {
    getCategories,
    getMenuItems
} from "../services/api";

function Menu() {

    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);

    const [selectedCategory, setSelectedCategory] =
        useState("all");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function loadMenu() {

            try {

                setLoading(true);
                setError("");

                const [
                    categoriesData,
                    itemsData
                ] = await Promise.all([
                    getCategories(),
                    getMenuItems()
                ]);

            console.log("Categories:", categoriesData);
            console.log("Menu Items:", itemsData);

                setCategories(categoriesData);
                setItems(itemsData);

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to load menu. Please try again."
                );

            } finally {

                setLoading(false);

            }
        }

        loadMenu();

    }, []);


    const filteredItems =
        selectedCategory === "all"
            ? items
            : items.filter(
                (item) =>
                    item.category_id ===
                    Number(selectedCategory)
            );


    return (
        <main className="menu-page">

            {/* HERO */}

            <section className="menu-hero">

                <div className="container">

                    <span>
                        FRESH & DELICIOUS
                    </span>

                    <h1>
                        Our Menu
                    </h1>

                    <p>
                        Choose your favourite food
                        and add it to your cart.
                    </p>

                </div>

            </section>


            {/* MENU */}

            <section className="section">

                <div className="container">

                    {/* CATEGORY TABS */}

                    <div className="category-tabs">

                        <button
                            className={
                                selectedCategory === "all"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setSelectedCategory("all")
                            }
                        >
                            All
                        </button>


                        {categories.map((category) => (

                            <button
                                key={category.id}
                                className={
                                    selectedCategory ===
                                    String(category.id)
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setSelectedCategory(
                                        String(category.id)
                                    )
                                }
                            >
                                {category.name}
                            </button>

                        ))}

                    </div>


                    {/* LOADING */}

                    {loading && (
                        <div className="menu-message">
                            Loading menu...
                        </div>
                    )}


                    {/* ERROR */}

                    {!loading && error && (
                        <div className="menu-message error">
                            {error}
                        </div>
                    )}


                    {/* MENU ITEMS */}

                    {!loading &&
                        !error &&
                        filteredItems.length > 0 && (

                            <div className="menu-grid">

                                {filteredItems.map((item) => (

                                    <MenuCard
                                        key={item.id}
                                        item={item}
                                    />

                                ))}

                            </div>

                        )}


                    {/* NO ITEMS */}

                    {!loading &&
                        !error &&
                        filteredItems.length === 0 && (

                            <div className="menu-message">
                                No menu items found.
                            </div>

                        )}

                </div>

            </section>

        </main>
    );
}

export default Menu;