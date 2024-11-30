import React from "react";
import { Page } from "./Page";
import { sales, customers, salesHeaders } from "../data/sampleData";

export const Sales = () => {
  const attributes = [
    { label: "ID", name: "saleId", type: "text" },
    { label: "Date", name: "date", type: "text" },
    {
      label: "Customer",
      name: "customer",
      type: "dropdown",
      options: customers,
    },
  ];

  return (
    <div>
      <h1>Sales</h1>
      <Page
        headers={salesHeaders}
        sampleData={sales}
        attributes={attributes}
        tableName="Sale"
      />
    </div>
  );
};
