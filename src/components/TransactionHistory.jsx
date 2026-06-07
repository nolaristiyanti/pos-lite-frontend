const TransactionHistory = ({
    transactions,
    loading,
    onViewDetail,
  }) => {
    if (loading) {
      return (
        <div className="rounded-xl border bg-white p-6">
          Loading transactions...
        </div>
      );
    }
  
    if (transactions.length === 0) {
      return (
        <div className="rounded-xl border bg-white p-6 text-center text-gray-500">
          No transactions found.
        </div>
      );
    }
  
    return (
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Transaction History
        </h2>
  
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-left">
                  ID
                </th>

                <th className="px-4 py-3 text-center">
                    Action
                </th>
  
                <th className="px-4 py-3 text-left">
                  Date
                </th>
  
                <th className="px-4 py-3 text-left">
                  Payment
                </th>
  
                <th className="px-4 py-3 text-right">
                  Total
                </th>
              </tr>
            </thead>
  
            <tbody>
              {transactions.map(
                (transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b"
                  >
                    <td className="px-4 py-3">
                      #{transaction.id}
                    </td>

                    <td className="px-4 py-3 text-center">
                        <button
                            onClick={() =>
                            onViewDetail(
                                transaction.id
                            )
                            }
                            className="rounded-lg bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                        >
                            View
                        </button>
                    </td>
  
                    <td className="px-4 py-3">
                      {new Date(
                        transaction.created_at
                      ).toLocaleDateString(
                        "id-ID"
                      )}
                    </td>
  
                    <td className="px-4 py-3 capitalize">
                      {
                        transaction.payment_method
                      }
                    </td>
  
                    <td className="px-4 py-3 text-right font-medium">
                      Rp{" "}
                      {Number(
                        transaction.total_price
                      ).toLocaleString(
                        "id-ID"
                      )}
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