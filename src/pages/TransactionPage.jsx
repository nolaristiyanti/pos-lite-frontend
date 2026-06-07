import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { checkout } from "../api/transactionApi";

export default function TransactionPage() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProducts({
        page: 1,
        search: "",
      });

      setProducts(response.data.data || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        return;
      }

      setCartItems((prev) =>
        prev.map((item) =>
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

    setCartItems((prev) => [
      ...prev,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };

  const increaseQty = (productId) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        if (item.quantity >= item.stock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  };

  const decreaseQty = (productId) => {
    setCartItems((prev) =>
      prev
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
    setCartItems((prev) =>
      prev.filter(
        (item) => item.id !== productId
      )
    );
  };

  const clearCart = () => {
    const confirmed = window.confirm(
      "Clear all items from cart?"
    );

    if (!confirmed) return;

    setCartItems([]);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to complete this transaction?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCheckoutLoading(true);
      setError("");
      setSuccessMessage("");

      const payload = {
        payment_method: paymentMethod,
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      await checkout(payload);

      setSuccessMessage(
        "Transaction completed successfully."
      );

      setCartItems([]);

      await fetchProducts();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Checkout failed."
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price) * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Transaction
        </h1>

        <p className="text-gray-500">
          Select products and create a
          transaction.
        </p>
      </div>

      {successMessage && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Product Catalog */}

        <div className="lg:col-span-2">
          {loading && (
            <div className="rounded-xl border bg-white p-6">
              Loading products...
            </div>
          )}

          {!loading &&
            products.length === 0 && (
              <div className="rounded-xl border bg-white p-6 text-center text-gray-500">
                No products available.
              </div>
            )}

          {!loading &&
            products.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => {
                  const cartItem =
                    cartItems.find(
                      (item) =>
                        item.id === product.id
                    );

                  const quantityInCart =
                    cartItem?.quantity || 0;

                  const stockReached =
                    quantityInCart >=
                    product.stock;

                  return (
                    <div
                      key={product.id}
                      className="rounded-xl border bg-white p-4 shadow-sm"
                    >
                      <div className="space-y-2">
                        <h3 className="font-semibold">
                          {product.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {product.description ||
                            "No description"}
                        </p>

                        <div className="text-lg font-bold text-blue-600">
                          Rp{" "}
                          {Number(
                            product.price
                          ).toLocaleString(
                            "id-ID"
                          )}
                        </div>

                        <div>
                          {product.stock > 0 ? (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                              Stock:{" "}
                              {product.stock}
                            </span>
                          ) : (
                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                              Out of Stock
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() =>
                            addToCart(product)
                          }
                          disabled={
                            product.stock <= 0 ||
                            stockReached
                          }
                          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                          {stockReached
                            ? "Stock Limit Reached"
                            : "Add To Cart"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </div>

        {/* Cart */}

        <div>
          <div className="sticky top-4">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Cart
                </h2>

                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Clear
                  </button>
                )}
              </div>

              {cartItems.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500">
                  Cart is empty
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border p-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">
                            {item.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            Rp{" "}
                            {Number(
                              item.price
                            ).toLocaleString(
                              "id-ID"
                            )}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            removeItem(item.id)
                          }
                          className="text-sm text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              decreaseQty(
                                item.id
                              )
                            }
                            className="h-8 w-8 rounded border"
                          >
                            -
                          </button>

                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQty(
                                item.id
                              )
                            }
                            disabled={
                              item.quantity >=
                              item.stock
                            }
                            className="h-8 w-8 rounded border disabled:bg-gray-100 disabled:text-gray-400"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-medium">
                            Rp{" "}
                            {(
                              Number(
                                item.price
                              ) *
                              item.quantity
                            ).toLocaleString(
                              "id-ID"
                            )}
                          </div>

                          <div className="text-xs text-gray-500">
                            Subtotal
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span>Total Items</span>
                      <span>
                        {totalQuantity}
                      </span>
                    </div>

                    <div className="mt-2 flex justify-between text-lg font-bold">
                      <span>Total</span>

                      <span>
                        Rp{" "}
                        {cartTotal.toLocaleString(
                          "id-ID"
                        )}
                      </span>
                    </div>

                    <div className="mt-5">
                      <label className="mb-2 block text-sm font-medium">
                        Payment Method
                      </label>

                      <select
                        value={paymentMethod}
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg border px-3 py-2"
                      >
                        <option value="cash">
                          Cash
                        </option>

                        <option value="qris">
                          QRIS
                        </option>

                        <option value="transfer">
                          Bank Transfer
                        </option>
                      </select>
                    </div>

                    <button
                      onClick={
                        handleCheckout
                      }
                      disabled={
                        cartItems.length ===
                          0 ||
                        checkoutLoading
                      }
                      className="mt-5 w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      {checkoutLoading
                        ? "Processing..."
                        : "Checkout"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}