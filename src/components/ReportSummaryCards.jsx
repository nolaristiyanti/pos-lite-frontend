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
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
          <div className="mb-2 text-sm font-medium text-gray-500">
            Total Sales
          </div>
  
          <div className="text-3xl font-bold text-green-600">
            {formattedSales}
          </div>
        </div>
  
        <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
          <div className="mb-2 text-sm font-medium text-gray-500">
            Total Transactions
          </div>
  
          <div className="text-3xl font-bold text-blue-600">
            {totalTransactions}
          </div>
        </div>
      </div>
    );
  };
  
  export default ReportSummaryCards;