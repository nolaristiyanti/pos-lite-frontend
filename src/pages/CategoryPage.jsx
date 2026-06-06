import { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCategories();

      const categoryData =
        response?.data?.data || [];

      setCategories(categoryData);
    } catch (err) {
      console.error(err);

      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p>Loading categories...</p>
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

      {/* Table Card */}

      <div className="bg-white rounded-xl shadow">
        <div className="p-5 border-b">
          <h2 className="font-semibold">
            Category List
          </h2>
        </div>

        {categories.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No categories found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4">
                    ID
                  </th>

                  <th className="text-left p-4">
                    Category Name
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-t"
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
        )}
      </div>
    </div>
  );
}