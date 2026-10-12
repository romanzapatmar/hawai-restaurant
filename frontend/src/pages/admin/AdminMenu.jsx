import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAdminMenuItems,
    getAdminCategories,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    createCategory,
    updateCategory,
    deleteCategory
} from "../../services/api";

function AdminMenu() {

    const navigate = useNavigate();

    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);

    const [showMenuForm, setShowMenuForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);

    const [editingItem, setEditingItem] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [menuForm, setMenuForm] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        is_vegetarian: true,
        is_available: true,
        category_id: ""
    });

    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);
            setError("");

            const [items, cats] = await Promise.all([
                getAdminMenuItems(),
                getAdminCategories()
            ]);

            setMenuItems(items);
            setCategories(cats);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        localStorage.removeItem("admin_logged_in");
        localStorage.removeItem("admin_username");
        navigate("/admin/login");
    }

    function resetMenuForm() {
        setMenuForm({
            name: "",
            description: "",
            price: "",
            image: "",
            is_vegetarian: true,
            is_available: true,
            category_id: ""
        });

        setEditingItem(null);
        setShowMenuForm(false);
    }

    function editItem(item) {
        setEditingItem(item);

        setMenuForm({
            name: item.name || "",
            description: item.description || "",
            price: item.price || "",
            image: item.image || "",
            is_vegetarian: item.is_vegetarian,
            is_available: item.is_available,
            category_id: item.category_id
        });

        setShowMenuForm(true);
    }

    async function handleMenuSubmit(e) {
        e.preventDefault();

        try {
            const data = {
                name: menuForm.name,
                description: menuForm.description,
                price: Number(menuForm.price),
                image: menuForm.image || null,
                is_vegetarian: menuForm.is_vegetarian,
                is_available: menuForm.is_available,
                category_id: Number(menuForm.category_id)
            };

            if (editingItem) {

                const updated = await updateMenuItem(
                    editingItem.id,
                    data
                );

                setMenuItems((current) =>
                    current.map((item) =>
                        item.id === updated.id
                            ? updated
                            : item
                    )
                );

            } else {

                const created = await createMenuItem(data);

                setMenuItems((current) => [
                    created,
                    ...current
                ]);
            }

            resetMenuForm();

        } catch (err) {
            alert(err.message);
        }
    }

    async function handleDeleteItem(id) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this menu item?"
        );

        if (!confirmed) return;

        try {

            await deleteMenuItem(id);

            setMenuItems((current) =>
                current.filter((item) => item.id !== id)
            );

        } catch (err) {
            alert(err.message);
        }
    }

    function editCategory(category) {
        setEditingCategory(category);
        setCategoryName(category.name);
        setShowCategoryForm(true);
    }

    function resetCategoryForm() {
        setCategoryName("");
        setEditingCategory(null);
        setShowCategoryForm(false);
    }

    async function handleCategorySubmit(e) {
        e.preventDefault();

        if (!categoryName.trim()) {
            alert("Please enter category name");
            return;
        }

        try {

            if (editingCategory) {

                const updated = await updateCategory(
                    editingCategory.id,
                    {
                        name: categoryName.trim()
                    }
                );

                setCategories((current) =>
                    current.map((category) =>
                        category.id === updated.id
                            ? updated
                            : category
                    )
                );

            } else {

                const created = await createCategory({
                    name: categoryName.trim()
                });

                setCategories((current) => [
                    ...current,
                    created
                ]);
            }

            resetCategoryForm();

        } catch (err) {
            alert(err.message);
        }
    }

    async function handleDeleteCategory(id) {

        const hasItems = menuItems.some(
            (item) => item.category_id === id
        );

        if (hasItems) {

            const confirmed = window.confirm(
                "This category has menu items. Deleting it will also delete those menu items. Continue?"
            );

            if (!confirmed) return;

        } else {

            const confirmed = window.confirm(
                "Are you sure you want to delete this category?"
            );

            if (!confirmed) return;
        }

        try {

            await deleteCategory(id);

            setCategories((current) =>
                current.filter(
                    (category) => category.id !== id
                )
            );

            setMenuItems((current) =>
                current.filter(
                    (item) => item.category_id !== id
                )
            );

        } catch (err) {
            alert(err.message);
        }
    }

    function getCategoryName(categoryId) {

        const category = categories.find(
            (cat) => cat.id === categoryId
        );

        return category
            ? category.name
            : "Unknown";
    }

    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <div className="admin-page">

                <aside className="admin-sidebar">

                    <div className="admin-brand">
                        <h2>Hawai Admin</h2>
                    </div>

                    <nav className="admin-menu">

                        <button
                            onClick={() => navigate("/admin")}
                        >
                            Dashboard
                        </button>

                        <button
                            onClick={() => navigate("/admin/orders")}
                        >
                            Orders
                        </button>

                        <button
                            className="admin-menu-active"
                            onClick={() => navigate("/admin/menu")}
                        >
                            Menu
                        </button>

                    </nav>

                    <button
                        className="admin-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </aside>

                <main className="admin-content">
                    <h2>Loading menu...</h2>
                </main>

            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | MAIN PAGE
    |--------------------------------------------------------------------------
    */

    return (
        <div className="admin-page">

            {/* SIDEBAR */}

            <aside className="admin-sidebar">

                <div className="admin-brand">
                    <h2>Hawai Admin</h2>
                </div>

                <nav className="admin-menu">

                    <button
                        onClick={() => navigate("/admin")}
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/admin/orders")}
                    >
                        Orders
                    </button>

                    <button
                        className="admin-menu-active"
                        onClick={() => navigate("/admin/menu")}
                    >
                        Menu
                    </button>

                </nav>

                <button
                    className="admin-logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </aside>


            {/* MAIN CONTENT */}

            <main className="admin-content">

                <div className="admin-page-header">

                    <div>
                        <h1>Menu Management</h1>

                        <p>
                            Manage restaurant menu items and categories.
                        </p>
                    </div>

                    <button
                        className="admin-primary-btn"
                        onClick={() => {
                            resetMenuForm();
                            setShowMenuForm(true);
                        }}
                    >
                        + Add Menu Item
                    </button>

                </div>


                {/* ERROR */}

                {error && (
                    <div className="admin-error">
                        {error}
                    </div>
                )}


                {/* MENU FORM */}

                {showMenuForm && (

                    <div className="admin-form-card">

                        <div className="admin-form-header">

                            <h2>
                                {editingItem
                                    ? "Edit Menu Item"
                                    : "Add Menu Item"}
                            </h2>

                            <button
                                onClick={resetMenuForm}
                                className="admin-close-btn"
                            >
                                ×
                            </button>

                        </div>

                        <form onSubmit={handleMenuSubmit}>

                            <div className="admin-form-grid">

                                <div className="admin-form-group">

                                    <label>
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        value={menuForm.name}
                                        onChange={(e) =>
                                            setMenuForm({
                                                ...menuForm,
                                                name: e.target.value
                                            })
                                        }
                                        required
                                    />

                                </div>


                                <div className="admin-form-group">

                                    <label>
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={menuForm.price}
                                        onChange={(e) =>
                                            setMenuForm({
                                                ...menuForm,
                                                price: e.target.value
                                            })
                                        }
                                        required
                                    />

                                </div>


                                <div className="admin-form-group">

                                    <label>
                                        Category
                                    </label>

                                    <select
                                        value={menuForm.category_id}
                                        onChange={(e) =>
                                            setMenuForm({
                                                ...menuForm,
                                                category_id: e.target.value
                                            })
                                        }
                                        required
                                    >

                                        <option value="">
                                            Select Category
                                        </option>

                                        {categories.map((category) => (

                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>

                                        ))}

                                    </select>

                                </div>


                                <div className="admin-form-group">

                                    <label>
                                        Image URL
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        value={menuForm.image}
                                        onChange={(e) =>
                                            setMenuForm({
                                                ...menuForm,
                                                image: e.target.value
                                            })
                                        }
                                    />

                                </div>

                            </div>


                            <div className="admin-form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    rows="4"
                                    value={menuForm.description}
                                    onChange={(e) =>
                                        setMenuForm({
                                            ...menuForm,
                                            description: e.target.value
                                        })
                                    }
                                />

                            </div>


                            <div className="admin-checkbox-row">

                                <label>

                                    <input
                                        type="checkbox"
                                        checked={menuForm.is_vegetarian}
                                        onChange={(e) =>
                                            setMenuForm({
                                                ...menuForm,
                                                is_vegetarian:
                                                    e.target.checked
                                            })
                                        }
                                    />

                                    Vegetarian

                                </label>


                                <label>

                                    <input
                                        type="checkbox"
                                        checked={menuForm.is_available}
                                        onChange={(e) =>
                                            setMenuForm({
                                                ...menuForm,
                                                is_available:
                                                    e.target.checked
                                            })
                                        }
                                    />

                                    Available

                                </label>

                            </div>


                            <div className="admin-form-actions">

                                <button
                                    type="button"
                                    className="admin-secondary-btn"
                                    onClick={resetMenuForm}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="admin-primary-btn"
                                >
                                    {editingItem
                                        ? "Update Item"
                                        : "Add Item"}
                                </button>

                            </div>

                        </form>

                    </div>

                )}


                {/* MENU ITEMS */}

                <div className="admin-section">

                    <div className="admin-section-header">

                        <h2>
                            Menu Items
                        </h2>

                        <span>
                            {menuItems.length} items
                        </span>

                    </div>


                    <div className="admin-menu-grid">

                        {menuItems.map((item) => (

                            <div
                                className="admin-menu-card"
                                key={item.id}
                            >

                                {item.image && (

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="admin-menu-image"
                                    />

                                )}


                                <div className="admin-menu-content">

                                    <div className="admin-menu-title-row">

                                        <h3>
                                            {item.name}
                                        </h3>

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

                                    </div>


                                    <p className="admin-menu-category">

                                        {getCategoryName(
                                            item.category_id
                                        )}

                                    </p>


                                    <p className="admin-menu-description">

                                        {item.description ||
                                            "No description"}

                                    </p>


                                    <div className="admin-menu-footer">

                                        <strong>
                                            ₹{item.price}
                                        </strong>

                                        {item.is_vegetarian && (

                                            <span className="veg-label">
                                                ● Veg
                                            </span>

                                        )}

                                    </div>


                                    <div className="admin-menu-actions">

                                        <button
                                            onClick={() =>
                                                editItem(item)
                                            }
                                            className="admin-edit-btn"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDeleteItem(
                                                    item.id
                                                )
                                            }
                                            className="admin-delete-btn"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>


                {/* CATEGORIES */}

                <div className="admin-section">

                    <div className="admin-section-header">

                        <div>

                            <h2>
                                Categories
                            </h2>

                            <span>
                                {categories.length} categories
                            </span>

                        </div>


                        <button
                            className="admin-primary-btn"
                            onClick={() => {
                                resetCategoryForm();
                                setShowCategoryForm(true);
                            }}
                        >
                            + Add Category
                        </button>

                    </div>


                    {showCategoryForm && (

                        <div className="admin-category-form">

                            <form onSubmit={handleCategorySubmit}>

                                <input
                                    type="text"
                                    placeholder="Category name"
                                    value={categoryName}
                                    onChange={(e) =>
                                        setCategoryName(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <button
                                    type="submit"
                                    className="admin-primary-btn"
                                >
                                    {editingCategory
                                        ? "Update"
                                        : "Add"}
                                </button>

                                <button
                                    type="button"
                                    className="admin-secondary-btn"
                                    onClick={resetCategoryForm}
                                >
                                    Cancel
                                </button>

                            </form>

                        </div>

                    )}


                    <div className="admin-category-list">

                        {categories.map((category) => (

                            <div
                                className="admin-category-card"
                                key={category.id}
                            >

                                <div>

                                    <strong>
                                        {category.name}
                                    </strong>

                                    <span>

                                        {
                                            menuItems.filter(
                                                (item) =>
                                                    item.category_id ===
                                                    category.id
                                            ).length
                                        }{" "}
                                        items

                                    </span>

                                </div>


                                <div>

                                    <button
                                        className="admin-edit-btn"
                                        onClick={() =>
                                            editCategory(
                                                category
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="admin-delete-btn"
                                        onClick={() =>
                                            handleDeleteCategory(
                                                category.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </main>

        </div>
    );
}

export default AdminMenu;
