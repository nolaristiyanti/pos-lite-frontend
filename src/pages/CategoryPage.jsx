import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
} from "../api/categoryApi";

import CategoryFormModal from "../components/CategoryFormModal";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [showModal, setShowModal] =
    useState(false);

  const [submitLoading, setSubmitLoading] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [formData, setFormData] = useState({
    name: "",
  });

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
        paginationData.current_page || 1
      );

      setLastPage(
        paginationData.last_page || 1
      );

      setTotal(
        paginationData.total || 0
      );
    } catch (err) {
      console.error(err);

      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      setSubmitLoading(true);

      await createCategory(formData);

      setShowModal(false);

      setFormData({
        name: "",
      });

      setSuccessMessage(
        "Category created successfully"
      );

      fetchCategories(
        currentPage,
        search
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);

      alert("Failed to create category");
    } finally {
      setSubmitLoading(false);
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
        <div className="bg-white rounded-xl shadow p-6">
          Loading categories...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Success Message */}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl">
          {successMessage}
        </div>
      )}

      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Category Management
          </h1>

          <p className="text-gray-500">
            Manage product categories
          </p>
        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Category
        </button>
      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-4">
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
                  {categories.map(
                    (category) => (
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
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}

            <div className="flex justify-between items-center p-4 border-t">
              <button
                disabled={
                  currentPage === 1
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              <span>
                Page {currentPage} of{" "}
                {lastPage}
              </span>

              <button
                disabled={
                  currentPage ===
                  lastPage
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1
                  )
                }
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal */}

      {showModal && (
        <CategoryFormModal
          title="Create Category"
          formData={formData}
          setFormData={setFormData}
          onSubmit={
            handleCreateCategory
          }
          onClose={() =>
            setShowModal(false)
          }
          loading={submitLoading}
        />
      )}
    </div>
  );
}