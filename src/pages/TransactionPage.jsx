import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import {
  checkout,
  getTransactions,
  getTransactionById,
} from "../api/transactionApi";

import TransactionHistory from "../components/TransactionHistory";
import TransactionDetailModal from "../components/TransactionDetailModal";
import { ShoppingCart } from "lucide-react";


export default function TransactionPage() {
  const [products, setProducts] = useState([]);

  const [transactions, setTransactions] = useState([]);
  const [transactionPage, setTransactionPage,] = useState(1);
  const [transactionLastPage, setTransactionLastPage,] = useState(1);
  const [transactionLoading, setTransactionLoading,] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState("");

  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [
    selectedTransaction,
    setSelectedTransaction,
  ] = useState(null);
  
  const [
    detailModalOpen,
    setDetailModalOpen,
  ] = useState(false);

  const [paymentFilter, setPaymentFilter,] = useState("");

  const today = new Date()
  .toLocaleDateString("en-CA");

  const [startDate, setStartDate] =
    useState(today);

  const [endDate, setEndDate] =
    useState(today);

  useEffect(() => {
    fetchProducts(currentPage, search);
  }, [currentPage, search]);
  
  useEffect(() => {
    fetchTransactions(
      transactionPage,
      paymentFilter,
      startDate,
      endDate
    );
  }, [transactionPage]);

  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleStartDateChange = (
    value
  ) => {
    setStartDate(value);
  
    if (
      endDate &&
      value > endDate
    ) {
      setEndDate(value);
    }
  };

  const handleApplyFilter = () => {
    setTransactionPage(1);
  
    fetchTransactions(
      1,
      paymentFilter,
      startDate,
      endDate
    );
  };

  const fetchProducts = async (
    page = currentPage,
    searchTerm = search
  ) => {
    try {
      setLoading(true);
      setError("");

      const response = await getProducts({
        page,
        search: searchTerm,
        per_page: 12,
      });

      console.log(response);

      setProducts(
        response.data.data || []
      );

      setLastPage(
        response.data.last_page || 1
      );
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

  const fetchTransactions = async (
    page = 1,
    paymentMethod = paymentFilter,
    start = startDate,
    end = endDate
  ) => {
    try {
      setTransactionLoading(
        true
      );

      const response =
        await getTransactions(
          page,
          paymentMethod,
          start,
          end
        );

      setTransactions(
        response.data.data || []
      );

      setTransactionLastPage(
        response.data
          .last_page || 1
      );
    } catch (error) {
      console.error(error);
    } finally {
      setTransactionLoading(
        false
      );
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

      const response =
        await checkout(payload);

      setSuccessMessage(
        "Transaction completed successfully."
      );

      setSelectedTransaction(
        response.data
      );

      setDetailModalOpen(true);

      setCartItems([]);

      await fetchProducts();

      await fetchTransactions(
        transactionPage
      );
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

  const handleViewDetail =
  async (id) => {
    try {
      const response =
        await getTransactionById(id);

      setSelectedTransaction(
        response.data
      );

      setDetailModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* <h1 className="text-3xl font-bold tracking-tight">
        Transaction Management
      </h1> */}

      {/* <p className="mt-1 text-gray-500">
        Manage sales transactions and monitor transaction history.
      </p> */}

      {successMessage && (
        <div className="rounded-2xl border border-green-200 bg-white p-4 text-green-700">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-white p-4 text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Cart Section */}

        <div className="lg:col-span-4">
          <div
            className="
              rounded-3xl
              border
              border-[#ECE7E3]
              bg-white
              p-6
              shadow-sm
            "
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#18181B]">
                  Shopping Cart
                </h2>

                <p className="mt-1 text-sm text-[#71717A]">
                  Review selected products
                </p>
              </div>

              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="
                    rounded-xl
                    bg-red-50
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-red-600
                    transition
                    hover:bg-red-100
                  "
                >
                  Clear Cart
                </button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="py-12 text-center">
                

                <div className="mt-1 text-sm text-[#71717A] flex items-center justify-center">
                <ShoppingCart/>
                </div>

                {/* <p className="text-sm font-medium text-[#18181B]">
                  Your cart is empty
                </p> */}

                <p className="mt-1 text-sm text-[#71717A]">
                  Select products to start a transaction
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="
                      rounded-2xl
                      border
                      border-[#ECE7E3]
                      p-4
                      transition
                      hover:bg-[#FCFBFA]
                    "
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-[#18181B]">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-[#71717A]">
                          Rp{" "}
                          {Number(item.price).toLocaleString(
                            "id-ID"
                          )}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="
                          rounded-xl
                          bg-red-50
                          px-3
                          py-1.5
                          text-xs
                          font-medium
                          text-red-600
                          transition
                          hover:bg-red-100
                        "
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div
                        className="
                          flex
                          items-center
                          overflow-hidden
                          rounded-xl
                          border
                          border-[#ECE7E3]
                        "
                      >
                        <button
                          onClick={() =>
                            decreaseQty(item.id)
                          }
                          className="
                            h-9
                            w-9
                            bg-[#FAF6F2]
                            text-[#8B5A3C]
                            transition
                            hover:bg-[#F3ECE7]
                          "
                        >
                          -
                        </button>

                        <span className="w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQty(item.id)
                          }
                          disabled={
                            item.quantity >= item.stock
                          }
                          className="
                            h-9
                            w-9
                            bg-[#FAF6F2]
                            text-[#8B5A3C]
                            transition
                            hover:bg-[#F3ECE7]
                            disabled:bg-gray-100
                            disabled:text-gray-400
                          "
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-[#18181B]">
                          Rp{" "}
                          {(
                            Number(item.price) *
                            item.quantity
                          ).toLocaleString("id-ID")}
                        </div>

                        <div className="text-xs text-[#71717A]">
                          Subtotal
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t border-[#ECE7E3] pt-5">
                  <div
                    className="
                      rounded-3xl
                      border
                      border-[#ECE7E3]
                      bg-[#FAF6F2]
                      p-5
                    "
                  >
                    <div className="mb-5">
                      <h3 className="text-lg font-semibold text-[#18181B]">
                        Current Order
                      </h3>

                      <p className="mt-1 text-sm text-[#71717A]">
                        Review order before checkout
                      </p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#71717A]">
                          Total Items
                        </span>

                        <span className="font-medium text-[#18181B]">
                          {totalQuantity}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#71717A]">
                          Subtotal
                        </span>

                        <span className="font-medium text-[#18181B]">
                          Rp{" "}
                          {cartTotal.toLocaleString(
                            "id-ID"
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="my-5 border-t border-[#E6D8CD]" />

                    <div
                      className="
                        rounded-2xl
                        border
                        border-[#ECE7E3]
                        bg-white
                        p-5
                      "
                    >
                      <p className="text-xs uppercase tracking-[0.15em] text-[#71717A]">
                        Total Payment
                      </p>

                      <p className="mt-2 text-3xl font-bold text-[#8B5A3C]">
                        Rp{" "}
                        {cartTotal.toLocaleString(
                          "id-ID"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="mb-2 block text-sm font-medium text-[#18181B]">
                      Payment Method
                    </label>

                    <select
                      value={paymentMethod}
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-[#ECE7E3]
                        px-4
                        py-3
                        outline-none
                        transition
                        focus:border-[#8B5A3C]
                      "
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
                    onClick={handleCheckout}
                    disabled={
                      cartItems.length === 0 ||
                      checkoutLoading
                    }
                    className="
                      mt-5
                      w-full
                      rounded-2xl
                      bg-[#8B5A3C]
                      px-4
                      py-3.5
                      text-sm
                      font-medium
                      text-white
                      transition-all
                      hover:bg-[#72452B]
                      disabled:cursor-not-allowed
                      disabled:bg-gray-300
                    "
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

        {/* Product Catalog Section */}

        <div className="lg:col-span-8">
        <div
  className="
    rounded-3xl
    border
    border-[#ECE7E3]
    bg-white
    p-6
    shadow-sm
  "
>
  <div className="mb-6">
    <h2 className="text-lg font-semibold text-[#18181B]">
      Product Catalog
    </h2>

    <p className="mt-1 text-sm text-[#71717A]">
      Search and add products to cart
    </p>
  </div>

  <div
    className="
      mb-6
      rounded-2xl
      border
      border-[#ECE7E3]
      bg-[#FCFBFA]
      p-4
    "
  >
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => {
        setCurrentPage(1);
        setSearch(e.target.value);
      }}
      className="
        w-full
        rounded-2xl
        border
        border-[#ECE7E3]
        px-4
        py-3
        outline-none
        transition
        focus:border-[#8B5A3C]
      "
    />
  </div>

  {loading && (
    <div
      className="
        rounded-2xl
        border
        border-[#ECE7E3]
        bg-[#FCFBFA]
        p-10
        text-center
        text-[#71717A]
      "
    >
      Loading products...
    </div>
  )}

  {!loading && products.length === 0 && (
    <div
      className="
        rounded-2xl
        border
        border-[#ECE7E3]
        bg-[#FCFBFA]
        p-10
        text-center
      "
    >
      <p className="font-medium text-[#18181B]">
        No products found
      </p>

      <p className="mt-1 text-sm text-[#71717A]">
        Try another search keyword
      </p>
    </div>
  )}

  {!loading && products.length > 0 && (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => {
          const cartItem = cartItems.find(
            (item) => item.id === product.id
          );

          const quantityInCart =
            cartItem?.quantity || 0;

          const stockReached =
            quantityInCart >= product.stock;

          return (
            <div
              key={product.id}
              className="
                rounded-2xl
                border
                border-[#ECE7E3]
                bg-white
                p-5
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-[#DCC5AF]
              "
            >
              <div className="flex h-full flex-col">
                <div className="flex-1">
                  <h3 className="font-semibold text-[#18181B]">
                    {product.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-[#71717A]">
                    {product.description ||
                      "No description available"}
                  </p>

                  <div className="mt-4">
                    <p className="text-2xl font-bold text-[#8B5A3C]">
                      Rp{" "}
                      {Number(
                        product.price
                      ).toLocaleString("id-ID")}
                    </p>
                  </div>

                  <div className="mt-4">
                    {product.stock > 0 ? (
                      <span
                        className="
                          inline-flex
                          rounded-full
                          bg-[#FAF6F2]
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-[#8B5A3C]
                        "
                      >
                        Stock: {product.stock}
                      </span>
                    ) : (
                      <span
                        className="
                          inline-flex
                          rounded-full
                          bg-red-50
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-red-600
                        "
                      >
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() =>
                    addToCart(product)
                  }
                  disabled={
                    product.stock <= 0 ||
                    stockReached
                  }
                  className="
                    mt-5
                    w-full
                    rounded-2xl
                    bg-[#8B5A3C]
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-white
                    transition-all
                    hover:bg-[#72452B]
                    disabled:cursor-not-allowed
                    disabled:bg-gray-300
                  "
                >
                  {stockReached
                    ? "Stock Limit Reached"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.max(prev - 1, 1)
            )
          }
          disabled={currentPage === 1}
          className="
            rounded-xl
            border
            border-[#ECE7E3]
            bg-white
            px-4
            py-2
            text-sm
            transition
            hover:bg-[#FAF6F2]
            disabled:opacity-50
          "
        >
          Previous
        </button>

        <div
          className="
            rounded-xl
            bg-[#FAF6F2]
            px-4
            py-2
            text-sm
            font-medium
            text-[#8B5A3C]
          "
        >
          Page {currentPage} of {lastPage}
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, lastPage)
            )
          }
          disabled={currentPage === lastPage}
          className="
            rounded-xl
            border
            border-[#ECE7E3]
            bg-white
            px-4
            py-2
            text-sm
            transition
            hover:bg-[#FAF6F2]
            disabled:opacity-50
          "
        >
          Next
        </button>
      </div>
    </>
  )}
</div>
        </div>
      </div>

      <div
        className="
          rounded-3xl
          border
          border-[#ECE7E3]
          bg-white
          p-6
          shadow-sm
        "
      >
        <div className="mb-5">
          <h2 className="font-semibold text-[#18181B]">
            Transaction Filters
          </h2>

          <p className="mt-1 text-sm text-[#71717A]">
            Filter transaction history by date range and payment method
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <input
            type="date"
            value={startDate}
            max={today}
            onChange={(e) =>
              handleStartDateChange(
                e.target.value
              )
            }
            className="
              rounded-2xl
              border
              border-[#ECE7E3]
              px-4
              py-3
              outline-none
              transition
              focus:border-[#8B5A3C]
            "
          />

          <input
            type="date"
            value={endDate}
            min={startDate}
            max={today}
            onChange={(e) =>
              setEndDate(
                e.target.value
              )
            }
            className="
              rounded-2xl
              border
              border-[#ECE7E3]
              px-4
              py-3
              outline-none
              transition
              focus:border-[#8B5A3C]
            "
          />

          <select
            value={paymentFilter}
            onChange={(e) =>
              setPaymentFilter(
                e.target.value
              )
            }
            className="
              rounded-2xl
              border
              border-[#ECE7E3]
              px-4
              py-3
              outline-none
              transition
              focus:border-[#8B5A3C]
            "
          >
            <option value="">
              All Payment Methods
            </option>

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

          <button
            onClick={handleApplyFilter}
            className="
              rounded-2xl
              bg-[#8B5A3C]
              px-4
              py-3
              text-sm
              font-medium
              text-white
              transition-all
              hover:bg-[#72452B]
            "
          >
            Apply Filter
          </button>
        </div>
      </div>

      <TransactionHistory
        transactions={transactions}
        loading={transactionLoading}
        onViewDetail={
          handleViewDetail
        }
      />

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() =>
            setTransactionPage(
              (prev) =>
                Math.max(prev - 1, 1)
            )
          }
          disabled={
            transactionPage === 1
          }
          className="rounded border px-3 py-2 disabled:bg-gray-100"
        >
          Prev
        </button>

        <span>
          Page {transactionPage} of{" "}
          {transactionLastPage}
        </span>

        <button
          onClick={() =>
            setTransactionPage(
              (prev) =>
                Math.min(
                  prev + 1,
                  transactionLastPage
                )
            )
          }
          disabled={
            transactionPage ===
            transactionLastPage
          }
          className="rounded border px-3 py-2 disabled:bg-gray-100"
        >
          Next
        </button>
      </div>

      <TransactionDetailModal
        open={detailModalOpen}
        transaction={
          selectedTransaction
        }
        onClose={() =>
          setDetailModalOpen(false)
        }
      />
    </div>
  );
}