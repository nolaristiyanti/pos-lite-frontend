import { useEffect } from "react";
import { getTotalSales } from "../api/reportApi";

const ReportPage = () => {
  useEffect(() => {
    const test = async () => {
      try {
        const response = await getTotalSales();
        console.log("REPORT DATA:", response);
      } catch (error) {
        console.error(error);
      }
    };

    test();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Reports Page
      </h1>
    </div>
  );
};

export default ReportPage;