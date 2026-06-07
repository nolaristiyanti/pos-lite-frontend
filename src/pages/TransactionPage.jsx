import { useState } from "react";

export default function TransactionPage() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );

      return;
    }

    setCartItems([
      ...cartItems,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };

  const increaseQty = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (productId) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId) => {
    setCartItems(
      cartItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        Transaction
      </h1>

      <div className="rounded-lg border bg-white p-6">
        <p className="text-gray-500">
          Cart state initialized.
        </p>

        <div className="mt-4">
          <p>
            Total Items: {cartItems.length}
          </p>

          <p>
            Cart Total: Rp{" "}
            {cartTotal.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
}