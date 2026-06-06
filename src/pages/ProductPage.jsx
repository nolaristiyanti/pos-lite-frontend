import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import {
  getCategories,
  getAllCategories
} from "../api/categoryApi";

import ProductFormModal from "../components/ProductFormModal";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

export default function ProductPage() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [searchInput, setSearchInput] =
    useState("");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [lastPage, setLastPage] =
    useState(1);

  const [categories, setCategories] =
  useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [successMessage, setSuccessMessage] =
    useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, search]);

  useEffect(() => {
    if (!successMessage) return;
  
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  
    return () => clearTimeout(timer);
  }, [successMessage]);

  const fetchCategories = async () => {
    try {
      const response =
        await getAllCategories();

      setCategories(
        response.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getProducts({
          page: currentPage,
          search,
        });

      setProducts(response.data.data);
      setLastPage(response.data.last_page);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setSearch(searchInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSubmitProduct =
  async (data) => {
    try {
      if (editingProduct) {
        await updateProduct(
          editingProduct.id,
          data
        );

        setSuccessMessage(
          "Product updated successfully"
        );
      } else {
        await createProduct(data);

        setSuccessMessage(
          "Product created successfully"
        );
      }

      setShowModal(false);
      setEditingProduct(null);

      fetchProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save product"
      );
    }
  };

  const handleDeleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
  
    if (!confirmed) return;
  
    try {
      await deleteProduct(id);
  
      setSuccessMessage(
        "Product deleted successfully"
      );
  
      fetchProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete product"
      );
    }
  };

  const getImageUrl = (image) => {
    if (!image) {
      return "https://via.placeholder.com/150";
    }
  
    if (image.startsWith("http")) {
      return image;
    }
  
    return `http://127.0.0.1:8000/storage/${image}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Product Management
        </h1>

        <p className="text-gray-500">
          Manage products and inventory.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowModal(true);
          }}
          className="rounded-lg bg-green-600 px-4 py-2 text-white"
        >
          + Add Product
        </button>
      </div>

      {/* Search */}

      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="Search product..."
          value={searchInput}
          onChange={(e) =>
            setSearchInput(e.target.value)
          }
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />

        <button
          onClick={handleSearch}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Search
        </button>
      </div>

      {/* Loading */}

      {loading && (
        <div className="rounded-lg border p-4">
          Loading products...
        </div>
      )}

      {/* Error */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Empty */}

      {!loading &&
        !error &&
        products.length === 0 && (
          <div className="rounded-lg border p-6 text-center text-gray-500">
            <div className="space-y-2">
              <p className="text-lg font-medium">
                No Products Found
              </p>

              <p className="text-sm text-gray-500">
                Try another keyword or create a new product.
              </p>
            </div>
          </div>
        )}

      {
        successMessage && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
            {successMessage}
          </div>
        )
      }

      {/* Table */}

      {!loading &&
        !error &&
        products.length > 0 && (
          <>
            <div className="overflow-x-auto rounded-xl border bg-white">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3">#</th>
                    <th className="p-3">
                      Image
                    </th>
                    <th className="p-3">
                      Product
                    </th>
                    <th className="p-3">
                      Category
                    </th>
                    <th className="p-3">
                      Price
                    </th>
                    <th className="p-3">
                      Stock
                    </th>
                    <th className="p-3">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map(
                    (product, index) => (
                      <tr
                        key={product.id}
                        className="border-t"
                      >
                        <td className="p-3">
                          {(currentPage - 1) *
                            10 +
                            index +
                            1}
                        </td>

                        <td className="p-3">
                          <img
                            src={getImageUrl(product.image)}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg border object-cover"
                          />
                        </td>

                        <td className="p-3">
                          {product.name}
                        </td>

                        <td className="p-3">
                          {
                            product.category
                              ?.name
                          }
                        </td>

                        <td className="p-3">
                          Rp {Number(product.price).toLocaleString("id-ID")}
                        </td>

                        <td className="p-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium
                            ${
                              product.stock <= 10
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>

                        <td className="p-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingProduct({
                                  ...product,
                                  category_id:
                                    product.category_id ||
                                    product.category?.id,
                                });

                                setShowModal(true);
                              }}
                              className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-600"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDeleteProduct(
                                  product.id
                                )
                              }
                              className="rounded bg-red-600 px-3 py-1 text-white"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}

            <div className="flex items-center justify-center gap-4">
              <button
                disabled={
                  currentPage === 1
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
                className="rounded-lg border px-4 py-2 disabled:opacity-50"
              >
                Previous
              </button>

              <span>
                Page {currentPage} of{" "}
                {lastPage}
              </span>

              <button
                disabled={
                  currentPage === lastPage
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1
                  )
                }
                className="rounded-lg border px-4 py-2 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}

        <ProductFormModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingProduct(null);
          }}
          onSubmit={
            handleSubmitProduct
          }
          categories={categories}
          initialData={
            editingProduct
          }
        />
    </div>
  );
}