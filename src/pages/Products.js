import React from "react";
import { Page } from "./Page";
import { products, categories, productsHeaders } from "../data/sampleData";

export const Products = () => {
  const attributes = [
    { label: "ID", name: "productId", type: "text" },
    {
      label: "Category",
      name: "category",
      type: "dropdown",
      options: categories,
    },
    { label: "Name", name: "name", type: "text" },
    { label: "Unit Price", name: "unitPrice", type: "text" },
  ];

  return (
    <div>
      <h1>Products</h1>
      <Page
        headers={productsHeaders}
        sampleData={products}
        attributes={attributes}
        tableName="Product"
      />
    </div>
  );
};
