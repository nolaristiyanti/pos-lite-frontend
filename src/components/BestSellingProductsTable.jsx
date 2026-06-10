import { Award, Trophy } from "lucide-react";

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

const getRowStyle = () => "";

const BestSellingProductsTable = ({
  products,
}) => {
  return (
    <div className="rounded-2xl
        border border-[#E8D7C5]
        bg-white
        p-6
        shadow-sm">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <Trophy
            size={18}
            className="text-amber-500"
          />

          <h2 className="text-lg font-semibold text-[#4B2E2B]">
            Best Selling Products
          </h2>
        </div>

        {/* <p className="text-sm text-[#8A7A6A]">
          Top performers during the selected period
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
              <tr className="border-b bg-[#FAF7F3] border-[#ECE3D8]">
                <th className="w-20 px-4 py-3 text-left text-[#4B2E2B]">
                  #
                </th>

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
                (product, index) => {
                  const rank = index + 1;

                  return (
                    <tr
                      className="
                        border-b border-[#F5EEE6] transition-colors hover:bg-[#FCFAF8]
                      "
                    >
                      <td className="px-4 py-3">
                        {rank <= 3 ? (
                          <span className="text-xl">
                            {getRankDisplay(rank)}
                          </span>
                        ) : (
                          <span
                            className="
                              inline-flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-full
                              bg-[#F8F4EE]
                              dtext-[#7A523B]
                              text-sm
                              font-semibold
                            "
                          >
                            {rank}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 font-medium text-[#4B2E2B]">
                        {product.product_name}
                      </td>

                      <td className="px-4 py-3 text-right">
                        <span
                          className="
                            inline-flex
                            rounded-full
                            bg-[#F8F4EE]
                            px-3
                            py-1
                            text-sm
                            font-semibold
                            text-[#7A523B]
                          "
                        >
                          {product.total_sold} sold
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