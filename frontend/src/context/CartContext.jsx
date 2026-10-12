import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);

    const addToCart = (item) => {

        setCart((currentCart) => {

            const existingItem = currentCart.find(
                (cartItem) => cartItem.menu_item_id === item.id
            );

            if (existingItem) {
                return currentCart.map((cartItem) =>
                    cartItem.menu_item_id === item.id
                        ? {
                            ...cartItem,
                            quantity: cartItem.quantity + 1
                        }
                        : cartItem
                );
            }

            return [
                ...currentCart,
                {
                    menu_item_id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    quantity: 1
                }
            ];
        });
    };

    const increaseQuantity = (id) => {

        setCart((currentCart) =>
            currentCart.map((item) =>
                item.menu_item_id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );
    };

    const decreaseQuantity = (id) => {

        setCart((currentCart) =>
            currentCart
                .map((item) =>
                    item.menu_item_id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (id) => {

        setCart((currentCart) =>
            currentCart.filter(
                (item) => item.menu_item_id !== id
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}