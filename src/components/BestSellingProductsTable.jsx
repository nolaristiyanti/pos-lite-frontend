const BestSellingProductsTable = ({
    products,
  }) => {
    return (
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Best Selling Products
          </h2>
  
          <p className="text-sm text-gray-500">
            Top 10 products based on sales
          </p>
        </div>
  
        {products.length === 0 ? (
          <p className="text-gray-500">
            No sales data available
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-3 text-left">
                    Rank
                  </th>
  
                  <th className="px-4 py-3 text-left">
                    Product
                  </th>
  
                  <th className="px-4 py-3 text-right">
                    Total Sold
                  </th>
                </tr>
              </thead>
  
              <tbody>
                {products.map(
                  (product, index) => (
                    <tr
                      key={product.product_id}
                      className="border-b"
                    >
                        <td className="px-4 py-3 font-semibold">
                            #{index + 1}
                        </td>

                        <td className="px-4 py-3 font-medium">
                            {product.product_name}
                        </td>

                        <td className="px-4 py-3 text-right">
                            {product.total_sold}
                        </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };
  
  export default BestSellingProductsTable;