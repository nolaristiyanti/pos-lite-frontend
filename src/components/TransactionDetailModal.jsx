const TransactionDetailModal = ({
    open,
    transaction,
    onClose,
  }) => {
    if (!open || !transaction) {
      return null;
    }
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              Transaction #
              {transaction.id}
            </h2>
  
            <button
              onClick={onClose}
              className="text-gray-500"
            >
              ✕
            </button>
          </div>
  
          <div className="mb-6 grid gap-3 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">
                Date
              </p>
  
              <p>
                {new Date(
                  transaction.created_at
                ).toLocaleDateString(
                  "id-ID"
                )}
              </p>
            </div>
  
            <div>
              <p className="text-sm text-gray-500">
                Payment
              </p>
  
              <p className="capitalize">
                {
                  transaction.payment_method
                }
              </p>
            </div>
  
            <div>
              <p className="text-sm text-gray-500">
                User
              </p>
  
              <p>
                {transaction.user?.name}
              </p>
            </div>
          </div>
  
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-3 text-left">
                    Product
                  </th>
  
                  <th className="px-4 py-3 text-right">
                    Qty
                  </th>
  
                  <th className="px-4 py-3 text-right">
                    Price
                  </th>
  
                  <th className="px-4 py-3 text-right">
                    Subtotal
                  </th>
                </tr>
              </thead>
  
              <tbody>
                {transaction.details?.map(
                  (item, index) => (
                    <tr
                      key={index}
                      className="border-b"
                    >
                      <td className="px-4 py-3">
                        {
                          item.product?.name
                        }
                      </td>
  
                      <td className="px-4 py-3 text-right">
                        {item.quantity}
                      </td>
  
                      <td className="px-4 py-3 text-right">
                        Rp{" "}
                        {Number(
                          item.price
                        ).toLocaleString(
                          "id-ID"
                        )}
                      </td>
  
                      <td className="px-4 py-3 text-right">
                        Rp{" "}
                        {(
                          Number(
                            item.price
                          ) *
                          item.quantity
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
  
          <div className="mt-6 border-t pt-4 text-right">
            <div className="text-lg font-bold">
              Total: Rp{" "}
              {Number(
                transaction.total_price
              ).toLocaleString(
                "id-ID"
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default TransactionDetailModal;