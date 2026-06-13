import { TrendingDown } from "lucide-react";

const getBadgeStyle = (
  totalSold
) => {
  const sold =
    Number(totalSold);

  if (sold === 0) {
    return `
      bg-red-50
      text-red-600
    `;
  }

  if (sold <= 2) {
    return `
      bg-amber-50
      text-amber-700
    `;
  }

  return `
    bg-[#FAF6F2]
    text-[#8B5A3C]
  `;
};

const getBadgeLabel = (
  totalSold
) => {
  const sold =
    Number(totalSold);

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
    <div
      className="
        rounded-3xl
        border border-[#ECE7E3]
        bg-white
        shadow-sm
      "
    >
      <div className="border-b border-[#ECE7E3] p-6">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-10 w-10 items-center justify-center
              rounded-2xl
              bg-[#FAF6F2]
            "
          >
            <TrendingDown
              size={18}
              className="text-[#8B5A3C]"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#18181B]">
              Slow Moving Products
            </h2>

            <p className="text-sm text-[#71717A]">
              Products with the lowest sales performance
            </p>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="p-10 text-center">
          <p className="text-sm text-[#71717A]">
            No sales data available.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className="
                  border-b border-[#ECE7E3]
                  bg-[#FAF6F2]
                "
              >
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#71717A] uppercase tracking-wide">
                  Product
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-[#71717A] uppercase tracking-wide">
                  Performance
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
                    className="
                      border-b border-[#ECE7E3]
                      transition-colors
                      hover:bg-[#FCFBFA]
                      last:border-b-0
                    "
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-[#18181B]">
                        {
                          product.product_name
                        }
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <span
                        className={`
                          inline-flex
                          rounded-full
                          px-3
                          py-1
                          text-sm
                          font-medium
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