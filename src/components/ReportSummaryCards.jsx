import {
  Wallet,
  Receipt,
} from "lucide-react";

const ReportSummaryCards = ({
  salesData,
}) => {
  const totalSales =
    salesData?.total_sales || 0;

  const totalTransactions =
    salesData?.total_transactions || 0;

  const formattedSales =
    new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }
    ).format(totalSales);

  const cards = [
    {
      title: "Total Sales",
      value: formattedSales,
      icon: Wallet,
    },
    {
      title: "Total Transactions",
      value: totalTransactions,
      icon: Receipt,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {cards.map(
        (
          {
            title,
            value,
            icon: Icon,
          },
          index
        ) => (
          <div
            key={index}
            className="
              rounded-3xl
              border border-[#ECE7E3]
              bg-white
              p-6
              shadow-sm
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className="
                    text-sm
                    font-medium
                    text-[#71717A]
                  "
                >
                  {title}
                </p>

                <h3
                  className="
                    mt-3
                    text-3xl
                    font-bold
                    tracking-tight
                    text-[#18181B]
                  "
                >
                  {value}
                </h3>
              </div>

              <div
                className="
                  flex h-12 w-12 items-center justify-center
                  rounded-2xl
                  bg-[#FAF6F2]
                "
              >
                <Icon
                  size={22}
                  className="text-[#8B5A3C]"
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ReportSummaryCards;