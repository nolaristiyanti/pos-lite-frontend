import { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchCategories = async (
    page = 1,
    searchTerm = ""
  ) => {
    try {
      setLoading(true);
      setError("");

      const response = await getCategories({
        page,
        search: searchTerm,
      });

      const paginationData = response.data;

      setCategories(
        paginationData.data || []
      );

      setCurrentPage(
        paginationData.current_page
      );

      setLastPage(
        paginationData.last_page
      );

      setTotal(
        paginationData.total
      );
    } catch (err) {
      console.error(err);

      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage, search);
  }, [currentPage]);

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    setCurrentPage(1);

    fetchCategories(1, value);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-6">
          Loading categories...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold">
          Category Management
        </h1>

        <p className="text-gray-500">
          Manage product categories
        </p>
      </div>

      {/* Search */}

      <div className="bg-white p-4 rounded-xl shadow">
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={handleSearch}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="font-semibold">
            Category List
          </h2>

          <span className="text-sm text-gray-500">
            Total: {total}
          </span>
        </div>

        {categories.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No categories found
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left">
                      ID
                    </th>

                    <th className="p-4 text-left">
                      Category Name
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4">
                        {category.id}
                      </td>

                      <td className="p-4">
                        {category.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}

            <div className="flex justify-between items-center p-4 border-t">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
                className="px-4 py-2 border rounded disabled:opacity-50"
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
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}