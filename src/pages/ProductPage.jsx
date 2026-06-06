import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";

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

  useEffect(() => {
    fetchProducts();
  }, [currentPage, search]);

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

      {/* Search */}

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search product..."
          value={searchInput}
          onChange={(e) =>
            setSearchInput(e.target.value)
          }
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-lg border px-4 py-2"
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
            No products found.
          </div>
        )}

      {/* Table */}

      {!loading &&
        !error &&
        products.length > 0 && (
          <>
            <div className="overflow-hidden rounded-xl border bg-white">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3">#</th>
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
                          {product.name}
                        </td>

                        <td className="p-3">
                          {
                            product.category
                              ?.name
                          }
                        </td>

                        <td className="p-3">
                          Rp{" "}
                          {Number(
                            product.price
                          ).toLocaleString()}
                        </td>

                        <td className="p-3">
                          {product.stock}
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
    </div>
  );
}