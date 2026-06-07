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

  const orderNumber = `ORD-${String(
    transaction.id
  ).padStart(6, "0")}`;

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
              ☕ Coffee Shop Receipt
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
            <h1 className="text-3xl font-bold tracking-wide">
              ☕ POS LITE COFFEE
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Modern Coffee Shop POS
            </p>
          </div>

          <div className="my-4 border-t border-dashed" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Order No</span>

              <span className="font-medium">
                {orderNumber}
              </span>
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

              <span className="uppercase">
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
                  className="border-b border-dashed pb-3"
                >
                  <div className="font-semibold">
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
                        item.quantity *
                          item.price
                      )}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="my-4 border-t border-dashed" />

          <div className="rounded-lg bg-gray-50 p-4">
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Total Payment
              </p>

              <p className="mt-2 text-3xl font-bold">
                Rp{" "}
                {formatCurrency(
                  transaction.total_price
                )}
              </p>
            </div>
          </div>

          <div className="my-4 border-t border-dashed" />

          <div className="text-center text-gray-600">
            <p className="font-medium">
              ☕ Thank You For Visiting
            </p>

            <p className="mt-1">
              See You Again
            </p>

            <p className="mt-3 text-xs text-gray-400">
              POS Lite Coffee Shop
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