import React from "react";
import { Page } from "./Page";
import {
  salesProducts,
  salesProductsHeaders,
  products,
} from "../data/sampleData";

export const SalesProducts = () => {
  const attributes = [
    { label: "ID", name: "saleProductId", type: "text" },
    { label: "Product", name: "product", type: "dropdown", options: products },
    { label: "Sale ID", name: "saleId", type: "text" },
    { label: "Quantity", name: "quantity", type: "text" },
    { label: "Line Total", name: "lineTotal", type: "text" },
  ];
  return (
    <div>
      <h1>SalesProducts</h1>
      <Page
        headers={salesProductsHeaders}
        sampleData={salesProducts}
        attributes={attributes}
        tableName="SaleProduct"
      />
    </div>
  );
};
