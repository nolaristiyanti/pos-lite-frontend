const TransactionHistory = ({
  transactions,
  loading,
  onViewDetail,
}) => {
  if (loading) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-[#ECE7E3]
          bg-white
          p-8
          shadow-sm
        "
      >
        <p className="text-sm text-[#71717A]">
          Loading transactions...
        </p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-[#ECE7E3]
          bg-white
          p-10
          text-center
          shadow-sm
        "
      >
        <p className="font-medium text-[#18181B]">
          No transactions found
        </p>

        <p className="mt-1 text-sm text-[#71717A]">
          Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-[#ECE7E3]
        bg-white
        shadow-sm
      "
    >
      <div className="border-b border-[#ECE7E3] p-6">
        <h2 className="text-lg font-semibold text-[#18181B]">
          Transaction History
        </h2>

        <p className="mt-1 text-sm text-[#71717A]">
          Review completed transactions
        </p>
      </div>

      <div className="overflow-x-auto">
      <table className="w-full">
          <thead>
            <tr className="bg-[#FAF6F2]">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#71717A]">
                Order No
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#71717A]">
                Date
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#71717A]">
                Payment
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#71717A]">
                Total
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-[#71717A]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(
              (transaction) => (
                <tr
                  key={transaction.id}
                  className="
                    border-t
                    border-[#F1EEEB]
                    transition-colors
                    hover:bg-[#FCFBFA]
                  "
                >
                  <td className="px-6 py-4 font-medium text-[#18181B] whitespace-nowrap">
                    ORD-{String(transaction.id).padStart(5, "0")}
                  </td>

                  <td className="px-6 py-4 text-[#71717A]">
                    {new Date(
                      transaction.created_at
                    ).toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`
                        inline-flex
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${
                          transaction.payment_method ===
                          "cash"
                            ? "bg-[#FAF6F2] text-[#8B5A3C]"
                            : transaction.payment_method ===
                              "qris"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-green-50 text-green-700"
                        }
                      `}
                    >
                      {transaction.payment_method}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right font-semibold text-[#18181B]">
                    Rp{" "}
                    {Number(
                      transaction.total_price
                    ).toLocaleString(
                      "id-ID"
                    )}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        onViewDetail(
                          transaction.id
                        )
                      }
                      className="
                        rounded-xl
                        bg-[#FAF6F2]
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-[#8B5A3C]
                        transition-colors
                        hover:bg-[#F3ECE7]
                      "
                    >
                      View
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;