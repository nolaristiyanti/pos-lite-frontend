import { TrendingDown } from "lucide-react";

const getBadgeStyle = (
    totalSold
  ) => {
    const sold = Number(totalSold);
  
    if (sold === 0) {
      return `
        bg-red-50
        text-red-700
      `;
    }
  
    if (sold <= 2) {
      return `
        bg-orange-50
        text-orange-700
      `;
    }
  
    return `
      bg-yellow-50
      text-yellow-700
    `;
  };
  
  const getBadgeLabel = (
    totalSold
  ) => {
    const sold = Number(totalSold);
  
    if (sold === 0) {
      return "No Sales";
    }
  
    return `${sold} sold`;
  };
  
  const SlowMovingProductsTable = ({
    products,
  }) => {
    const noSalesCount =
      products.filter(
        (product) =>
          product.total_sold === 0
      ).length;
  
    return (
      <div className="rounded-2xl
        border border-[#E8D7C5]
        bg-white
        p-6
        shadow-sm">
        <div className="mb-4">
            <div className="flex items-center gap-2">
                <TrendingDown
                    size={18}
                    className="text-orange-500"
                />

                <h2 className="text-lg font-semibold text-[#4B2E2B]">
                    Slow Moving Products
                </h2>
            </div>
  
            {/* <p className="text-sm text-[#8A7A6A]">
                Lowest-performing products during the selected period
            </p> */}
        </div>
  
        {products.length === 0 ? (
          <p className="text-[#8A7A6A]">
            No sales data available
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr
                    className="border-b bg-[#FAF7F3] border-[#ECE3D8]"
                >
                  <th className="px-4 py-3 text-left text-[#4B2E2B]">
                    Product
                  </th>
  
                  <th className="px-4 py-3 text-right text-[#4B2E2B]">
                    Sales
                  </th>
                </tr>
              </thead>
  
              <tbody>
                {products.map(
                  (product) => (
                    <tr
                      key={
                        product.product_id
                      }
                      className="border-b border-[#F5EEE6] transition-colors hover:bg-[#FCFAF8]"
                    >
                      <td className="px-4 py-3 font-medium text-[#4B2E2B]">
                        {
                          product.product_name
                        }
                      </td>
  
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`
                            inline-flex
                            rounded-full
                            px-3
                            py-1
                            text-sm
                            font-semibold
                            ${getBadgeStyle(
                              product.total_sold
                            )}
                          `}
                        >
                          {getBadgeLabel(
                            product.total_sold
                          )}
                        </span>
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
  
  export default SlowMovingProductsTable;