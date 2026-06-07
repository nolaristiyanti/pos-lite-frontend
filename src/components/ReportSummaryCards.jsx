const ReportSummaryCards = ({ salesData }) => {
    const totalSales = salesData?.total_sales || 0;
    const totalTransactions =
      salesData?.total_transactions || 0;
  
    const formattedSales = new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }
    ).format(totalSales);
  
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Sales
          </p>
  
          <h2 className="mt-2 text-3xl font-bold">
            {formattedSales}
          </h2>
        </div>
  
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Transactions
          </p>
  
          <h2 className="mt-2 text-3xl font-bold">
            {totalTransactions}
          </h2>
        </div>
      </div>
    );
  };
  
  export default ReportSummaryCards;