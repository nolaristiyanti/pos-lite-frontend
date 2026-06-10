import { TriangleAlert } from "lucide-react";

const getStockBadge = (stock) => {
  if (stock === 0) {
    return {
      label: "Out",
      className:
        "bg-red-600 text-white",
    };
  }

  if (stock <= 5) {
    return {
      label: stock,
      className:
        "bg-red-100 text-red-700",
    };
  }

  return {
    label: stock,
    className:
      "bg-orange-100 text-orange-700",
  };
};

const LowStockProductsTable = ({
  products,
  currentPage,
  lastPage,
  onPrevPage,
  onNextPage,
}) => {
  const sortedProducts = [
    ...products,
  ].sort((a, b) => {
    const getPriority = (
      stock
    ) => {
      if (stock === 0) return 0;
      if (stock <= 5) return 1;
      return 2;
    };

    const priorityA =
      getPriority(a.stock);

    const priorityB =
      getPriority(b.stock);

    if (
      priorityA !== priorityB
    ) {
      return (
        priorityA -
        priorityB
      );
    }

    return a.stock - b.stock;
  });

  const outOfStockCount =
    products.filter(
      (product) =>
        product.stock === 0
    ).length;

  const runningLowCount =
    products.filter(
      (product) =>
        product.stock > 0
    ).length;

  return (
    <div className="rounded-2xl
      border border-[#E8D7C5]
      bg-white
      p-6
      shadow-sm">

      <div className="mb-4">
        <div className="flex items-center gap-2">
          <TriangleAlert
            size={18}
            className="text-red-500"
          />

          <h2 className="text-lg font-semibold text-[#4B2E2B]">
            Low Stock Products
          </h2>

          <span
  className="
    rounded-full
    bg-[#F8F4EE]
    px-2.5
    py-1
    text-xs
    font-medium
    text-[#7A523B]
  "
>
  Realtime
</span>
        </div>
      </div>

      {/* <p className="mb-4 text-sm text-[#8A7A6A]">
        {outOfStockCount > 0
          ? `⚠️ ${outOfStockCount} out of stock, ${runningLowCount} running low`
          : `⚠️ ${runningLowCount} products running low`}
      </p> */}

      {products.length === 0 ? (
        <p className="text-[#8A7A6A]">
          No low stock products found
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr
                  className="border-b bg-[#FAF7F3] border-[#ECE3D8]"
                >
                  <th
                    className="
                      px-4 py-3
                      text-left
                      font-bold
                      text-[#4B2E2B]
                    "
                  >
                    Product
                  </th>

                  <th
                    className="
                      px-4 py-3
                      text-right
                      font-bold
                      text-[#4B2E2B]
                    "
                  >
                    Stock
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedProducts.map(
                  (product) => {
                    const badge =
                      getStockBadge(
                        product.stock
                      );

                    return (
                      <tr
                        key={
                          product.id
                        }
                        className="border-b border-[#F5EEE6] transition-colors hover:bg-[#FCFAF8]"
                      >
                        <td className="px-4 py-3 font-medium text-[#4B2E2B]">
                          {
                            product.name
                          }
                        </td>

                        <td className="px-4 py-3 text-right">
                          <span
                            className={`
                              inline-flex
                              min-w-[52px]
                              justify-center
                              rounded-full
                              px-3
                              py-1
                              text-sm
                              font-semibold
                              ${badge.className}
                            `}
                          >
                            {
                              badge.label
                            }
                          </span>
                        </td>
                      </tr>
                    );
                  }
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
              className="
                rounded-xl
                border
                border-[#DCC5AF]
                px-3
                py-2
                text-[#4B2E2B]
                hover:bg-[#FFF8F1]

                disabled:bg-[#F8F4EE]
                disabled:text-[#B89D83]
                disabled:border-[#E8D7C5]
              "
            >
              Prev
            </button>

            <span className="font-medium text-[#7A523B]">
              Page {currentPage} of {lastPage}
            </span>

            <button
              onClick={
                onNextPage
              }
              disabled={
                currentPage ===
                lastPage
              }
              className="
                rounded-xl
                border
                border-[#DCC5AF]
                px-3
                py-2
                text-[#4B2E2B]
                hover:bg-[#FFF8F1]

                disabled:bg-[#F8F4EE]
                disabled:text-[#B89D83]
                disabled:border-[#E8D7C5]
              "
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