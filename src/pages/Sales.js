import React from "react";
import { Page } from "./Page";
export const Sales = () => {
  const sampleData = [
    { saleId: 1, date: "2024-06-06", customerId: 1 },
    { saleId: 2, date: "2024-06-30", customerId: 2 },
    { saleId: 3, date: "2024-07-14", customerId: 3 },
  ];

  const attributes = [
    { label: "Sale ID", name: "saleId" },
    { label: "Date", name: "date" },
    { label: "Customer ID", name: "customerId" },
  ];

  return (
    <div>
      <h1>Sales</h1>
      <Page
        sampleData={sampleData}
        attributes={attributes}
        tableName="Sale"
      />
    </div>
  );
};
