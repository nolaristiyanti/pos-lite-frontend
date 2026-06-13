import { Trophy } from "lucide-react";

const getRankDisplay = (rank) => {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return rank;
  }
};

const BestSellingProductsTable = ({
  products,
}) => {
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
            <Trophy
              size={18}
              className="text-[#8B5A3C]"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#18181B]">
              Best Selling Products
            </h2>

            <p className="text-sm text-[#71717A]">
              Top performing products during the selected period
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
                <th className="w-24 px-6 py-4 text-left text-sm font-semibold text-[#71717A] uppercase tracking-wide">
                  Rank
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-[#71717A] uppercase tracking-wide">
                  Product
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-[#71717A] uppercase tracking-wide">
                  Sales
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map(
                (product, index) => {
                  const rank =
                    index + 1;

                  return (
                    <tr
                      key={
                        product.id ??
                        index
                      }
                      className="
                        border-b border-[#ECE7E3]
                        transition-colors
                        hover:bg-[#FCFBFA]
                        last:border-b-0
                      "
                    >
                      <td className="px-6 py-4">
                        {rank <= 3 ? (
                          <span className="text-xl">
                            {getRankDisplay(
                              rank
                            )}
                          </span>
                        ) : (
                          <div
                            className="
                              flex h-9 w-9 items-center justify-center
                              rounded-full
                              bg-[#FAF6F2]
                              text-sm
                              font-semibold
                              text-[#8B5A3C]
                            "
                          >
                            {rank}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-medium text-[#18181B]">
                          {
                            product.product_name
                          }
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span
                          className="
                            inline-flex
                            rounded-full
                            bg-[#FAF6F2]
                            px-3
                            py-1
                            text-sm
                            font-medium
                            text-[#8B5A3C]
                          "
                        >
                          {
                            product.total_sold
                          }{" "}
                          sold
                        </span>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BestSellingProductsTable;