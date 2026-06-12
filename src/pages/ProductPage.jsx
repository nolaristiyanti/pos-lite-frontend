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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#18181B]">
            Product Management
          </h1>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setShowModal(true);
          }}
          className="
            rounded-2xl
            bg-[#8B5A3C]
            px-5
            py-2.5
            text-sm
            font-medium
            text-white
            transition-all
            hover:bg-[#72452B]
            shadow-sm
          "
        >
          + Add Product
        </button>
      </div>

      {/* Search */}

      <div
        className="
          rounded-3xl
          border
          border-[#ECE7E3]
          bg-white
          p-4
          shadow-sm
        "
      >
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) =>
              setSearchInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            className="
              flex-1
              rounded-2xl
              border
              border-[#ECE7E3]
              bg-white
              px-4
              py-2.5
              outline-none
              transition
              focus:border-[#8B5A3C]
            "
          />

          <button
            onClick={handleSearch}
            className="
              rounded-2xl
              bg-[#8B5A3C]
              px-4
              py-2.5
              text-white
              transition
              hover:bg-[#72452B]
            "
          >
            Search
          </button>
        </div>
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
          <div
            className="
              rounded-2xl
              border
              border-[#E8DDD6]
              bg-[#FAF6F2]
              p-4
              text-[#8B5A3C]
            "
          >
            {successMessage}
          </div>
        )
      }

      {/* Table */}

      {!loading &&
        !error &&
        products.length > 0 && (
          <>
            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-[#ECE7E3]
                bg-white
                shadow-sm
              "
            >
              <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                <tr
                  className="
                    bg-[#FAF6F2]
                    text-left
                    text-sm
                    text-[#71717A]
                  "
                >
                    <th className="px-6 py-4 font-bold">#</th>
                    <th className="px-6 py-4 font-bold">
                      Image
                    </th>
                    <th className="px-6 py-4 font-bold">
                      Product
                    </th>
                    <th className="px-6 py-4 font-bold">
                      Category
                    </th>
                    <th className="px-6 py-4 font-bold">
                      Price
                    </th>
                    <th className="px-6 py-4 font-bold">
                      Stock
                    </th>
                    <th className="px-6 py-4 font-bold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map(
                    (product, index) => (
                      <tr
                        key={product.id}
                        className="
                          border-t
                          border-[#F1EEEB]
                          transition-colors
                          hover:bg-[#FCFBFA]
                        "
                      >
                        <td className="px-6 py-4">
                          {(currentPage - 1) *
                            10 +
                            index +
                            1}
                        </td>

                        <td className="px-6 py-4">
                          <img
                            src={getImageUrl(product.image)}
                            alt={product.name}
                            className="
                              h-14
                              w-14
                              rounded-xl
                              border
                              border-[#ECE7E3]
                              object-cover
                            "
                          />
                        </td>

                        <td className="px-6 py-4">
                          {product.name}
                        </td>

                        <td className="px-6 py-4">
                          {
                            product.category
                              ?.name
                          }
                        </td>

                        <td className="px-6 py-4">
                          Rp {Number(product.price).toLocaleString("id-ID")}
                        </td>

                        <td className="px-6 py-4">
                        <span
                          className={`
                            inline-flex
                            items-center
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-medium
                            ${
                              product.stock === 0
                                ? "bg-red-100 text-red-700"
                                : product.stock <= 10
                                ? "bg-amber-100 text-amber-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
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
                              className="
                                rounded-xl
                                bg-[#FAF6F2]
                                px-3
                                py-2
                                text-sm
                                font-medium
                                text-[#8B5A3C]
                                transition
                                hover:bg-[#F3ECE7]
                              "
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDeleteProduct(
                                  product.id
                                )
                              }
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
            </div>

            {/* Pagination */}

            <div className="flex items-center justify-center gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }
                className="
                  rounded-xl
                  border
                  border-[#ECE7E3]
                  bg-white
                  px-4
                  py-2
                  text-sm
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
                  text-[#8B5A3C]
                "
              >
                Page {currentPage} of {lastPage}
              </div>

              <button
                disabled={currentPage === lastPage}
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
                className="
                  rounded-xl
                  border
                  border-[#ECE7E3]
                  bg-white
                  px-4
                  py-2
                  text-sm
                  disabled:opacity-50
                "
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