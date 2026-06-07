const LowStockProductsTable = ({
  products,
  currentPage,
  lastPage,
  onPrevPage,
  onNextPage,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Low Stock Products
        </h2>

        <p className="text-sm text-gray-500">
          Products requiring stock
          replenishment
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">
          No low stock products found
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left">
                    Product
                  </th>

                  <th className="px-4 py-3 text-right">
                    Current Stock
                  </th>

                  <th className="px-4 py-3 text-center">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map(
                  (product) => (
                    <tr
                      key={
                        product.id
                      }
                      className="border-b"
                    >
                      <td className="px-4 py-3 font-medium">
                        {
                          product.name
                        }
                      </td>

                      <td className="px-4 py-3 text-right">
                        {
                          product.stock
                        }
                      </td>

                      <td className="px-4 py-3 text-center">
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                          ⚠️ Low
                          Stock
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={
                onPrevPage
              }
              disabled={
                currentPage === 1
              }
              className="rounded border px-3 py-2 disabled:bg-gray-100"
            >
              Prev
            </button>

            <span>
              Page{" "}
              {currentPage} of{" "}
              {lastPage}
            </span>

            <button
              onClick={
                onNextPage
              }
              disabled={
                currentPage ===
                lastPage
              }
              className="rounded border px-3 py-2 disabled:bg-gray-100"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LowStockProductsTable;