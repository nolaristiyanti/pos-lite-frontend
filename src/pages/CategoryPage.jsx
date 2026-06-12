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
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
        {error}
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Success Message */}
  
      {successMessage && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
          {successMessage}
        </div>
      )}
  
      {/* Header */}
  
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Category Management
          </h1>
  
          {/* <p className="mt-1 text-sm text-zinc-500">
            Manage product categories
          </p> */}
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
          className="
            rounded-xl
            bg-[#8B5A3C]
            px-4
            py-2.5
            text-sm
            font-medium
            text-white
            transition-all
            hover:bg-[#72452B]
          "
        >
          + Add Category
        </button>
      </div>
  
      {/* Search */}
  
      <div className="rounded-3xl border border-[#ECE7E3] bg-white p-4 shadow-sm">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            className="
              flex-1
              rounded-xl
              border
              border-[#ECE7E3]
              px-4
              py-2.5
              outline-none
              transition
              focus:border-[#8B5A3C]
            "
          />
  
          <button
            onClick={handleSearchSubmit}
            className="
              rounded-xl
              bg-[#8B5A3C]
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#72452B]
            "
          >
            Search
          </button>
        </div>
      </div>
  
      {/* Table */}
  
      <div
        className="
          overflow-hidden
          rounded-3xl
          border border-[#ECE7E3]
          bg-white
          shadow-sm
        "
      > 
        {categories.length === 0 ? (
          <div className="p-12 text-center text-zinc-500">
            No categories found
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className="
                      border-b border-[#ECE7E3]
                      bg-[#FAF6F2]
                    "
                  >
                    <th
                      className="
                        px-6 py-3
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-zinc-500
                      "
                    >
                      #
                    </th>
  
                    <th
                      className="
                        px-6 py-3
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-zinc-500
                      "
                    >
                      Category Name
                    </th>
  
                    <th
                      className="
                        px-6 py-3
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-zinc-500
                      "
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
  
                <tbody>
                  {categories.map(
                    (category, index) => (
                      <tr
                        key={category.id}
                        className="
                          border-t border-[#F1F1F1]
                          transition-all
                          duration-150
                          hover:bg-[#FCFBFA]
                        "
                      >
                        <td
                          className="
                            px-6 py-3.5
                            text-sm
                            font-medium
                            text-zinc-500
                          "
                        >
                          {(currentPage - 1) * 10 +
                            index +
                            1}
                        </td>
  
                        <td className="px-6 py-3.5">
                          <span className="text-sm font-medium text-zinc-900">
                            {category.name}
                          </span>
                        </td>
  
                        <td className="px-6 py-3.5">
                          <div className="flex gap-2">
                          <button
                            className="
                              rounded-lg
                              border border-[#E7E5E4]
                              bg-[#FAF6F2]
                              px-3 py-1.5
                              text-xs
                              font-semibold
                              text-[#8B5A3C]
                              transition-all
                              hover:bg-[#F4E7DB]
                              hover:border-[#D8B89C]
                            "
                          >
                            Edit
                          </button>
  
                            <button
                              onClick={() =>
                                handleDelete(category.id)
                              }
                              className="
                                rounded-lg
                                bg-red-50
                                px-3 py-1.5
                                text-xs
                                font-semibold
                                text-red-600
                                transition-all
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
  
            
          </>
        )}
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
            border border-[#ECE7E3]
            bg-white
            px-4 py-2
            text-sm
            font-medium
            text-zinc-700
            transition
            hover:border-[#D8B89C]
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
            text-[#8B5A3C]
          "
        >
          Page {currentPage} of {lastPage}
        </div>
  
        <button
          disabled={
            currentPage === lastPage
          }
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          className="
            rounded-xl
            border border-[#ECE7E3]
            bg-white
            px-4 py-2
            text-sm
            font-medium
            text-zinc-700
            transition
            hover:border-[#D8B89C]
            hover:bg-[#FAF6F2]
            disabled:opacity-50
          "
        >
          Next
        </button>
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
          onSubmit={handleSubmitCategory}
          onClose={() =>
            setShowModal(false)
          }
          loading={submitLoading}
        />
      )}
    </div>
  );
}