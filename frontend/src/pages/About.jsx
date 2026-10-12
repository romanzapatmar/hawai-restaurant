function About() {
    return (
        <main className="about-page">

            {/* HERO */}
            <section className="about-hero">
                <div className="container">

                    <span className="about-eyebrow">
                        Welcome to Hawai Restaurant
                    </span>

                    <h1>
                        Good Food.
                        <br />
                        Great Moments.
                    </h1>

                    <p>
                        We believe every meal should be fresh, delicious,
                        and memorable. Hawai Restaurant brings together
                        quality ingredients, great flavors, and warm
                        hospitality.
                    </p>

                </div>
            </section>


            {/* OUR STORY */}
            <section className="about-story">
                <div className="container about-story-grid">

                    <div className="about-story-image">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEh-PlM7FYZOrLHRZu92zRn9k72XQp7IyQxYVH2Pv0Xw&s=10"
                            alt="Hawai Restaurant"
                        />
                    </div>

                    <div className="about-story-content">

                        <span className="about-label">
                            Our Story
                        </span>

                        <h2>
                            Made with passion,
                            <br />
                            served with love.
                        </h2>

                        <p>
                            Hawai Restaurant was created with a simple
                            idea — to serve delicious food that people
                            love coming back for.
                        </p>

                        <p>
                            From carefully selected ingredients to the
                            final dish served at your table, we focus on
                            quality, freshness, and great taste.
                        </p>

                        <p>
                            Whether you are enjoying a quick meal with
                            friends, spending time with family, or simply
                            treating yourself, we are here to make every
                            visit special.
                        </p>

                    </div>

                </div>
            </section>


            {/* WHY US */}
            <section className="about-values">

                <div className="container">

                    <div className="about-section-heading">

                        <span className="about-label">
                            Why Hawai
                        </span>

                        <h2>
                            More than just a meal
                        </h2>

                        <p>
                            We put care into everything we serve.
                        </p>

                    </div>


                    <div className="about-values-grid">

                        <div className="about-value-card">

                            <div className="about-value-icon">
                                🍽️
                            </div>

                            <h3>
                                Delicious Food
                            </h3>

                            <p>
                                Carefully prepared dishes packed with
                                great flavors and made to satisfy.
                            </p>

                        </div>


                        <div className="about-value-card">

                            <div className="about-value-icon">
                                🥬
                            </div>

                            <h3>
                                Fresh Ingredients
                            </h3>

                            <p>
                                We believe better ingredients make
                                better food, so freshness matters to us.
                            </p>

                        </div>


                        <div className="about-value-card">

                            <div className="about-value-icon">
                                ❤️
                            </div>

                            <h3>
                                Made with Care
                            </h3>

                            <p>
                                Every order is prepared with attention
                                to quality, taste, and presentation.
                            </p>

                        </div>


                        <div className="about-value-card">

                            <div className="about-value-icon">
                                😊
                            </div>

                            <h3>
                                Happy Customers
                            </h3>

                            <p>
                                Your satisfaction is what motivates us
                                to keep improving every day.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="about-cta">

                <div className="container">

                    <h2>
                        Hungry already?
                    </h2>

                    <p>
                        Explore our menu and find something delicious
                        for your next meal.
                    </p>

                    <a
                        href="/menu"
                        className="about-cta-button"
                    >
                        Explore Our Menu
                    </a>

                </div>

            </section>

        </main>
    );
}

export default About;


