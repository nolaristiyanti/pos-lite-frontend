export default function CategoryFormModal({
    title,
    formData,
    setFormData,
    onSubmit,
    onClose,
    loading,
  }) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
          {/* Header */}
  
          <div className="p-5 border-b">
            <h2 className="text-lg font-semibold">
              {title}
            </h2>
          </div>
  
          {/* Body */}
  
          <form
            onSubmit={onSubmit}
            className="p-5 space-y-4"
          >
            <div>
              <label className="block mb-2 text-sm font-medium">
                Category Name
              </label>
  
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Enter category name"
              />
            </div>
  
            {/* Footer */}
  
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
  
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }