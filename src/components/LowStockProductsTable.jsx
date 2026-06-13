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
    <div
      className="
        overflow-hidden
        rounded-3xl
        border border-[#ECE7E3]
        bg-white
        shadow-sm
      "
    >
      {/* <div className="border-b border-[#ECE7E3] p-6">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-10 w-10 items-center justify-center
              rounded-2xl
              bg-[#FAF6F2]
            "
          >
            <TriangleAlert
              size={18}
              className="text-[#8B5A3C]"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#18181B]">
              Low Stock Products
            </h2>

            <p className="text-sm text-[#71717A]">
              Products that require inventory attention.
            </p>
          </div>
        </div>
      </div> */}

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
                  className="
                    border-b border-[#ECE7E3]
                    bg-[#FAF6F2]
                  "
                >
                  <th
                    className="
                      px-4 py-3
                      text-left
                      text-[#71717A] uppercase tracking-wide
                    "
                  >
                    Product
                  </th>

                  <th
                    className="
                      px-4 py-3
                      text-right
                      text-[#71717A] uppercase tracking-wide
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

          {/* <div className="m-4 flex items-center justify-center gap-2">
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
          </div> */}

          <div className="m-4 flex items-center justify-center gap-3">
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
                border-[#ECE7E3]
                bg-white
                px-4
                py-2
                text-sm
                transition
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
                font-medium
                text-[#8B5A3C]
              "
            >
              Page {currentPage} of {lastPage}
            </div>

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
                border-[#ECE7E3]
                bg-white
                px-4
                py-2
                text-sm
                transition
                hover:bg-[#FAF6F2]
                disabled:opacity-50
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