import { useState } from "react";
import {
    createContactMessage,
    createReview
} from "../services/api";

function Contact() {

    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [reviewForm, setReviewForm] = useState({
        name: "",
        rating: 0,
        message: ""
    });

    const [hoverRating, setHoverRating] = useState(0);

    const [contactLoading, setContactLoading] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(false);

    const [contactSuccess, setContactSuccess] = useState("");
    const [reviewSuccess, setReviewSuccess] = useState("");

    const [contactError, setContactError] = useState("");
    const [reviewError, setReviewError] = useState("");


    const handleContactChange = (e) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value
        });
    };


    const handleReviewChange = (e) => {
        setReviewForm({
            ...reviewForm,
            [e.target.name]: e.target.value
        });
    };


    const handleContactSubmit = async (e) => {
        e.preventDefault();

        setContactLoading(true);
        setContactSuccess("");
        setContactError("");

        try {
            await createContactMessage(contactForm);

            setContactSuccess(
                "Thank you! Your message has been sent successfully."
            );

            setContactForm({
                name: "",
                email: "",
                phone: "",
                message: ""
            });

        } catch (error) {
            setContactError(error.message);
        } finally {
            setContactLoading(false);
        }
    };


    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        setReviewSuccess("");
        setReviewError("");

        if (!reviewForm.rating) {
            setReviewError("Please select a rating.");
            return;
        }

        setReviewLoading(true);

        try {
            await createReview({
                name: reviewForm.name,
                rating: Number(reviewForm.rating),
                message: reviewForm.message
            });

            setReviewSuccess(
                "Thank you for your review!"
            );

            setReviewForm({
                name: "",
                rating: 0,
                message: ""
            });

            setHoverRating(0);

        } catch (error) {
            setReviewError(error.message);
        } finally {
            setReviewLoading(false);
        }
    };


    return (
        <div className="contact-page">

            {/* Hero */}

            <section className="contact-hero">
                <div className="container">

                    <span className="contact-eyebrow">
                        GET IN TOUCH
                    </span>

                    <h1>
                        Contact Us
                    </h1>

                    <p>
                        Have a question, suggestion or just want
                        to say hello? We'd love to hear from you.
                    </p>

                </div>
            </section>


            <section className="contact-section">
                <div className="container">

                    <div className="contact-grid">

                        {/* Contact Information */}

                        <div className="contact-info">

                            <h2>
                                We'd love to hear from you
                            </h2>

                            <p>
                                Whether you have a question about
                                our menu, your order, or anything
                                else, our team is ready to help.
                            </p>


                            <div className="contact-info-item">

                                <div className="contact-icon">
                                    📍
                                </div>

                                <div>
                                    <h4>Visit Us</h4>
                                    <p>
                                        Hawai Restaurant<br />
                                        Nagpur, India
                                    </p>
                                </div>

                            </div>


                            <div className="contact-info-item">

                                <div className="contact-icon">
                                    📞
                                </div>

                                <div>
                                    <h4>Call Us</h4>
                                    <p>
                                        +91 18XXXXXXXX
                                    </p>
                                </div>

                            </div>


                            <div className="contact-info-item">

                                <div className="contact-icon">
                                    ✉️
                                </div>

                                <div>
                                    <h4>Email</h4>
                                    <p>
                                        hello@hawairestaurant.com
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* Contact Form */}

                        <div className="contact-card">

                            <h2>
                                Send us a message
                            </h2>

                            {contactSuccess && (
                                <div className="contact-success">
                                    {contactSuccess}
                                </div>
                            )}

                            {contactError && (
                                <div className="contact-error">
                                    {contactError}
                                </div>
                            )}

                            <form onSubmit={handleContactSubmit}>

                                <div className="contact-form-row">

                                    <div className="contact-form-group">
                                        <label>
                                            Name *
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={contactForm.name}
                                            onChange={handleContactChange}
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>


                                    <div className="contact-form-group">
                                        <label>
                                            Email *
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={contactForm.email}
                                            onChange={handleContactChange}
                                            placeholder="Your email"
                                            required
                                        />
                                    </div>

                                </div>


                                <div className="contact-form-group">

                                    <label>
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={contactForm.phone}
                                        onChange={handleContactChange}
                                        placeholder="Your phone number"
                                    />

                                </div>


                                <div className="contact-form-group">

                                    <label>
                                        Message *
                                    </label>

                                    <textarea
                                        name="message"
                                        value={contactForm.message}
                                        onChange={handleContactChange}
                                        placeholder="Write your message..."
                                        rows="6"
                                        required
                                    />

                                </div>


                                <button
                                    type="submit"
                                    className="contact-submit-btn"
                                    disabled={contactLoading}
                                >
                                    {contactLoading
                                        ? "Sending..."
                                        : "Send Message"
                                    }
                                </button>

                            </form>

                        </div>

                    </div>


                    {/* Rating */}

                    <div className="review-section">

                        <div className="review-header">

                            <span className="contact-eyebrow">
                                YOUR EXPERIENCE
                            </span>

                            <h2>
                                Rate Your Experience
                            </h2>

                            <p>
                                Enjoyed your meal? Let us know
                                how we did!
                            </p>

                        </div>


                        <div className="review-card">

                            {reviewSuccess && (
                                <div className="contact-success">
                                    {reviewSuccess}
                                </div>
                            )}

                            {reviewError && (
                                <div className="contact-error">
                                    {reviewError}
                                </div>
                            )}


                            <form onSubmit={handleReviewSubmit}>

                                <div className="contact-form-group">

                                    <label>
                                        Your Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={reviewForm.name}
                                        onChange={handleReviewChange}
                                        placeholder="Your name"
                                        required
                                    />

                                </div>


                                <div className="rating-group">

                                    <label>
                                        Your Rating *
                                    </label>

                                    <div className="rating-stars">

                                        {[1, 2, 3, 4, 5].map((star) => (

                                            <button
                                                type="button"
                                                key={star}
                                                className={
                                                    star <= (
                                                        hoverRating ||
                                                        reviewForm.rating
                                                    )
                                                        ? "rating-star active"
                                                        : "rating-star"
                                                }
                                                onMouseEnter={() =>
                                                    setHoverRating(star)
                                                }
                                                onMouseLeave={() =>
                                                    setHoverRating(0)
                                                }
                                                onClick={() =>
                                                    setReviewForm({
                                                        ...reviewForm,
                                                        rating: star
                                                    })
                                                }
                                            >
                                                ★
                                            </button>

                                        ))}

                                    </div>

                                    {reviewForm.rating > 0 && (
                                        <span className="rating-text">
                                            {reviewForm.rating} out of 5
                                        </span>
                                    )}

                                </div>


                                <div className="contact-form-group">

                                    <label>
                                        Your Review
                                    </label>

                                    <textarea
                                        name="message"
                                        value={reviewForm.message}
                                        onChange={handleReviewChange}
                                        placeholder="Tell us about your experience..."
                                        rows="5"
                                    />

                                </div>


                                <button
                                    type="submit"
                                    className="review-submit-btn"
                                    disabled={reviewLoading}
                                >
                                    {reviewLoading
                                        ? "Submitting..."
                                        : "Submit Review"
                                    }
                                </button>

                            </form>

                        </div>

                    </div>

                </div>
            </section>

        </div>
    );
}

export default Contact;