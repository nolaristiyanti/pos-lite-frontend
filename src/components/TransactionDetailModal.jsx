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

  const transactionDate = new Date(
    transaction.created_at
  );

  const year =
    transactionDate.getFullYear();

  const month = String(
    transactionDate.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    transactionDate.getDate()
  ).padStart(2, "0");

  const datePart =
    `${year}${month}${day}`;

  const orderNumber =
    `ORD-${datePart}-${String(
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
          overflow-hidden
          rounded-3xl
          border
          border-[#ECE7E3]
          bg-white
          shadow-2xl
          print:max-w-lg
          print:border-0
          print:shadow-none
        "
      >
        {/* Header */}
        <div className="print-hidden border-b border-[#ECE7E3] p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#18181B]">
              BrewPOS Receipt
            </h2>

            <button
              onClick={onClose}
              className="
                rounded-lg
                p-2
                text-[#71717A]
                transition
                hover:bg-[#FAF6F2]
              "
            >
              ✕
            </button>
          </div>
        </div>

        {/* Receipt */}
        <div
          id="receipt-content"
          className="
            p-6
            font-mono
            text-sm
            print:text-base
          "
        >
          {/* Logo */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-wide text-[#4B2E2B]">
              ☕ BREWPOS
            </h1>

            <p className="mt-2 text-sm text-[#71717A]">
              Smart POS for Modern Business
            </p>
          </div>

          <div className="my-5 border-t border-dashed border-[#D6D3D1]" />

          {/* Transaction Info */}
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
                {
                  transaction.payment_method
                }
              </span>
            </div>
          </div>

          <div className="my-5 border-t border-dashed border-[#D6D3D1]" />

          {/* Items */}
          <div className="space-y-3">
            {transaction.details?.map(
              (item, index) => (
                <div
                  key={index}
                  className="
                    border-b
                    border-dashed
                    border-[#D6D3D1]
                    pb-3
                  "
                >
                  <div className="font-semibold">
                    {item.product?.name}
                  </div>

                  <div className="mt-1 flex justify-between text-[#71717A]">
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

          <div className="my-5 border-t border-dashed border-[#D6D3D1]" />

          {/* Total */}
          <div className="rounded-xl bg-[#FAF6F2] p-5">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-[#71717A]">
                Total Payment
              </p>

              <p className="mt-3 text-3xl font-bold text-[#8B5A3C]">
                Rp{" "}
                {formatCurrency(
                  transaction.total_price
                )}
              </p>
            </div>
          </div>

          <div className="my-5 border-t border-dashed border-[#D6D3D1]" />

          {/* Footer */}
          <div className="text-center text-[#71717A]">
            <p className="font-medium text-[#4B2E2B]">
              ☕ Thank You For Visiting
            </p>

            <p className="mt-1">
              See You Again
            </p>

            <p className="mt-4 text-xs text-[#A1A1AA]">
              BrewPOS
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="print-hidden border-t border-[#ECE7E3] p-5">
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="
                flex-1
                rounded-xl
                bg-[#8B5A3C]
                px-4
                py-2.5
                font-medium
                text-white
                transition
                hover:bg-[#72452B]
              "
            >
              Print Receipt
            </button>

            <button
              onClick={onClose}
              className="
                flex-1
                rounded-xl
                border
                border-[#ECE7E3]
                px-4
                py-2.5
                font-medium
                text-[#18181B]
                transition
                hover:bg-[#FAF6F2]
              "
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