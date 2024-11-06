import React from "react";
import { Page } from "./Page";

export const SalesProducts = () => {
  const sampleData = [
    { saleProductId: 1, productId: 2, saleId: 3, quantity: 2, lineTotal: 5 },
    { saleProductId: 2, productId: 2, saleId: 3, quantity: 2, lineTotal: 5 },
    { saleProductId: 3, productId: 2, saleId: 3, quantity: 2, lineTotal: 5 },
    { saleProductId: 4, productId: 2, saleId: 3, quantity: 2, lineTotal: 5 },
    { saleProductId: 5, productId: 2, saleId: 3, quantity: 2, lineTotal: 5 },
  ];

  const attributes = [
    { label: "Sale Product ID", name: "saleProductId" },
    { label: "Product ID", name: "productId" },
    { label: "Sale ID", name: "saleId" },
    { label: "Quantity", name: "quantity" },
    { label: "Line Total", name: "lineTotal" },
  ];
  return (
    <div>
      <h1>SalesProducts</h1>
      <Page
        sampleData={sampleData}
        attributes={attributes}
        tableName="SaleProduct"
      />
    </div>
  );
};
