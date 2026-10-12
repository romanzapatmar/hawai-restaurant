import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../services/api";

function Home() {

    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to load categories:", error);
            } finally {
                setCategoriesLoading(false);
            }
        };

        loadCategories();
    }, []);

    return (
        <main>

            {/* HERO */}

            <section className="hero">

                <div className="container hero-content">

                    <div>

                        <span className="hero-small">
                            WELCOME TO HAWAI
                        </span>

                        <h1>
                            Delicious Food.
                            <br />
                            Delivered With Love.
                        </h1>

                        <p>
                            Fresh ingredients, amazing flavours
                            and food made especially for you.
                        </p>

                        <div className="hero-buttons">

                            <Link
                                to="/menu"
                                className="btn btn-primary"
                            >
                                Explore Menu
                            </Link>

                            <Link
                                to="/cart"
                                className="btn btn-outline"
                            >
                                View Cart
                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            {/* CATEGORIES */}

            <section className="categories section">
                <div className="container">
                    <div className="section-heading">
                        <span>EXPLORE</span>
                        <h2>Our Categories</h2>
                    </div>

                    {categoriesLoading ? (
                        <p>Loading categories...</p>
                    ) : categories.length === 0 ? (
                        <p>No categories available.</p>
                    ) : (
                        <div className="category-grid">
                            {categories.map((category) => (
                                <div
                                    className="category-card"
                                    key={category.id}
                                >
                                    <div className="category-icon">
                                        {category.name
                                            ?.toLowerCase()
                                            .includes("pizza") ? "🍕" :
                                         category.name
                                            ?.toLowerCase()
                                            .includes("burger") ? "🍔" :
                                         category.name
                                            ?.toLowerCase()
                                            .includes("pasta") ? "🍝" :
                                         category.name
                                            ?.toLowerCase()
                                            .includes("drink") ? "🥤" : "🍽️"}
                                    </div>

                                    <h3>{category.name}</h3>

                                    <p>
                                        {category.description ||
                                            "Explore our delicious menu"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* POPULAR */}


            <section className="popular section">
                <div className="container">

                    <div className="section-heading">
                        <span>OUR SPECIALS</span>
                        <h2>Popular Dishes</h2>
                        <p>
                            Discover delicious flavours made to satisfy
                            your cravings.
                        </p>
                    </div>

                    <div className="popular-grid">

                        <div className="popular-card">
                            <div className="food-image">🍕</div>

                            <div className="food-content">
                                <span className="food-tag">BEST SELLER</span>
                                <h3>Hawaiian Pizza</h3>
                                <p>
                                    Crispy crust topped with melted cheese,
                                    juicy pineapple and rich flavours.
                                </p>

                                <div className="food-bottom">
                                    <strong>₹299</strong>
                                </div>
                            </div>
                        </div>

                        <div className="popular-card">
                            <div className="food-image">🍔</div>

                            <div className="food-content">
                                <span className="food-tag">CUSTOMER FAVOURITE</span>
                                <h3>Classic Burger</h3>
                                <p>
                                    A delicious burger layered with a juicy
                                    patty, fresh vegetables and signature sauce.
                                </p>

                                <div className="food-bottom">
                                    <strong>₹199</strong>
                                </div>
                            </div>
                        </div>

                        <div className="popular-card">
                            <div className="food-image">🍝</div>

                            <div className="food-content">
                                <span className="food-tag">CHEF'S SPECIAL</span>
                                <h3>Creamy Pasta</h3>
                                <p>
                                    Rich creamy sauce, aromatic herbs and
                                    perfectly cooked pasta in every bite.
                                </p>

                                <div className="food-bottom">
                                    <strong>₹249</strong>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="popular-cta">
                        <p>Hungry for more? Explore our complete menu.</p>

                        <Link to="/menu" className="visit-menu-btn">
                            Visit Full Menu <span>→</span>
                        </Link>
                    </div>

                </div>
            </section>


            {/* CTA */}

            <section className="order-cta">

                <div className="container">

                    <h2>
                        Hungry? Let's Fix That.
                    </h2>

                    <p>
                        Browse our menu and place your order now.
                    </p>

                    <Link
                        to="/menu"
                        className="btn btn-light"
                    >
                        Order Now
                    </Link>

                </div>

            </section>

        </main>
    );
}

export default Home;