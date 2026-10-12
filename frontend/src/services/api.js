
const API_BASE_URL = "https://hawai-restaurant-api.onrender.com";


export async function getCategories() {

    const response = await fetch(
        `${API_BASE_URL}/api/menu/categories`
    );

    if (!response.ok) {
        throw new Error("Failed to load categories");
    }

    return response.json();
}


export async function getMenuItems() {

    const response = await fetch(
        `${API_BASE_URL}/api/menu/items`
    );

    if (!response.ok) {
        throw new Error("Failed to load menu items");
    }

    return response.json();
}

export async function createOrder(orderData) {

    const response = await fetch(
        `${API_BASE_URL}/api/orders/`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(orderData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to place order"
        );
    }

    return data;
}

export async function adminLogin(username, password) {

    const response = await fetch(
        `${API_BASE_URL}/api/admin/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Login failed"
        );
    }

    return data;
}

export async function getOrders() {

    const response = await fetch(
        `${API_BASE_URL}/api/orders/`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to load orders"
        );
    }

    return data;
}


export async function getAdminMenuItems() {

    const response = await fetch(
        `${API_BASE_URL}/api/menu/items`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to load menu items"
        );
    }

    return data;
}


export async function getAdminCategories() {

    const response = await fetch(
        `${API_BASE_URL}/api/menu/categories`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to load categories"
        );
    }

    return data;
}

export async function updateOrderStatus(orderId, status) {

    const response = await fetch(
        `${API_BASE_URL}/api/orders/${orderId}/status`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                status: status
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to update order status"
        );
    }

    return data;
}

// =====================================================
// ADMIN MENU CRUD
// =====================================================

export async function createMenuItem(itemData) {
    const response = await fetch(
        `${API_BASE_URL}/api/menu/items`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to create menu item"
        );
    }

    return data;
}


export async function updateMenuItem(itemId, itemData) {
    const response = await fetch(
        `${API_BASE_URL}/api/menu/items/${itemId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to update menu item"
        );
    }

    return data;
}


export async function deleteMenuItem(itemId) {
    const response = await fetch(
        `${API_BASE_URL}/api/menu/items/${itemId}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to delete menu item"
        );
    }

    return data;
}


export async function createCategory(categoryData) {
    const response = await fetch(
        `${API_BASE_URL}/api/menu/categories`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoryData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to create category"
        );
    }

    return data;
}


export async function updateCategory(categoryId, categoryData) {
    const response = await fetch(
        `${API_BASE_URL}/api/menu/categories/${categoryId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoryData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to update category"
        );
    }

    return data;
}


export async function deleteCategory(categoryId) {
    const response = await fetch(
        `${API_BASE_URL}/api/menu/categories/${categoryId}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to delete category"
        );
    }

    return data;
}

export async function createContactMessage(contactData) {
    const response = await fetch(`${API_BASE_URL}/api/contact/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to send message"
        );
    }

    return data;
}


export async function createReview(reviewData) {
    const response = await fetch(`${API_BASE_URL}/api/contact/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to submit review"
        );
    }

    return data;
}


export async function getReviews() {
    const response = await fetch(
        `${API_BASE_URL}/api/contact/reviews`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to load reviews"
        );
    }

    return data;
}

