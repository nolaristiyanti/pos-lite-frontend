const TransactionDetailModal = ({
  open,
  transaction,
  onClose,
}) => {
  if (!open || !transaction) {
    return null;
  }

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("id-ID");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString(
      "id-ID",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="receipt-print-root fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="
          w-full
          max-w-md
          rounded-xl
          bg-white
          shadow-2xl
          print:max-w-lg
          print:shadow-none
        "
      >

        {/* Header */}
        <div className="print-hidden border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">
              Receipt Preview
            </h2>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div
          id="receipt-content"
          className="
            p-6
            font-mono
            text-sm
            print:text-base
          "
        >

          <div className="text-center">
            <h1 className="text-2xl font-bold">
              POS LITE
            </h1>

            <p className="mt-1 text-gray-500">
              Point of Sale System
            </p>
          </div>

          <div className="my-4 border-t border-dashed" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Receipt</span>
              <span>#{transaction.id}</span>
            </div>

            <div className="flex justify-between">
              <span>Date</span>
              <span>
                {formatDate(
                  transaction.created_at
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Cashier</span>
              <span>
                {transaction.user?.name}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Payment</span>
              <span className="capitalize">
                {transaction.payment_method}
              </span>
            </div>
          </div>

          <div className="my-4 border-t border-dashed" />

          <div className="space-y-3">
            {transaction.details?.map(
              (item, index) => (
                <div
                  key={index}
                  className="border-b border-dashed pb-2"
                >
                  <div className="font-medium">
                    {item.product?.name}
                  </div>

                  <div className="mt-1 flex justify-between text-gray-600">
                    <span>
                      {item.quantity} × Rp{" "}
                      {formatCurrency(
                        item.price
                      )}
                    </span>

                    <span>
                      Rp{" "}
                      {formatCurrency(
                        item.price *
                          item.quantity
                      )}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="my-4 border-t border-dashed" />

          <div className="flex justify-between text-lg font-bold">
            <span>TOTAL</span>

            <span>
              Rp{" "}
              {formatCurrency(
                transaction.total_price
              )}
            </span>
          </div>

          <div className="my-4 border-t border-dashed" />

          <div className="text-center text-gray-600">
            <p>Thank You</p>

            <p className="mt-1 text-xs">
              Powered by POS Lite
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="print-hidden border-t p-4">
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Print Receipt
            </button>

            <button
              onClick={onClose}
              className="flex-1 rounded-lg border px-4 py-2 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TransactionDetailModal;