import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
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

  const [isEditMode, setIsEditMode] =
  useState(false);

  const [selectedCategoryId, setSelectedCategoryId] =
  useState(null);

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

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
  
    if (!formData.name.trim()) {
      alert("Category name is required");
      return;
    }
  
    try {
      setSubmitLoading(true);
  
      if (isEditMode) {
        await updateCategory(
          selectedCategoryId,
          formData
        );
  
        setSuccessMessage(
          "Category updated successfully"
        );
      } else {
        await createCategory(formData);
  
        setSuccessMessage(
          "Category created successfully"
        );
      }
  
      setShowModal(false);
  
      setFormData({
        name: "",
      });
  
      setIsEditMode(false);
      setSelectedCategoryId(null);
  
      fetchCategories(
        currentPage,
        search
      );
  
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);
  
      alert(
        isEditMode
          ? "Failed to update category"
          : "Failed to create category"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage, search);
  }, [currentPage]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  
  const handleSearchSubmit = () => {
    setCurrentPage(1);
  
    fetchCategories(1, search);
  };
  
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleEdit = (category) => {
    setIsEditMode(true);
  
    setSelectedCategoryId(
      category.id
    );
  
    setFormData({
      name: category.name,
    });
  
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
  
    if (!confirmed) return;
  
    try {
      await deleteCategory(id);
  
      setSuccessMessage(
        "Category deleted successfully"
      );
  
      fetchCategories(
        currentPage,
        search
      );
  
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete category";
      alert(message);
    }
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
          onClick={() => {
            setIsEditMode(false);
          
            setSelectedCategoryId(null);
          
            setFormData({
              name: "",
            });
          
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Category
        </button>
      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            className="flex-1 border rounded-lg px-4 py-2"
          />

          <button
            onClick={handleSearchSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
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

                    <th className="p-4 text-left">
                      Actions
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

                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleEdit(category)
                              }
                              className="px-3 py-1 bg-yellow-500 text-white rounded"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(category.id)
                              }
                              className="px-3 py-1 bg-red-600 text-white rounded"
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
          title={
            isEditMode
              ? "Edit Category"
              : "Create Category"
          }
          formData={formData}
          setFormData={setFormData}
          onSubmit={
            handleSubmitCategory
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