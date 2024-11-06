import React from "react";
import { Page } from "./Page";

export const Products = () => {
  const sampleData = [
    {
      productId: 1,
      categoryId: 1,
      name: "Pocker Wet Tissues",
      unitPrice: 3.99,
    },
    { productId: 2, categoryId: 1, name: "Yum Shrimp Chips", unitPrice: 2.5 },
    {
      productId: 3,
      categoryId: 1,
      name: "Travel Toothbrush Set",
      unitPrice: 5.0,
    },
    {
      productId: 4,
      categoryId: 1,
      name: "Healthy Chicken Rice Set",
      unitPrice: 8.25,
    },
    {
      productId: 5,
      categoryId: 1,
      name: "Super Sparkling Water",
      unitPrice: 2,
    },
  ];

  const attributes = [
    { label: "Product ID", name: "productId" },
    { label: "Category ID", name: "categoryId" },
    { label: "Name", name: "name" },
    { label: "Unit Price", name: "unitPrice" },
  ];

  return (
    <div>
      <h1>Products</h1>
      <Page
        sampleData={sampleData}
        attributes={attributes}
        tableName="Product"
      />
    </div>
  );
};
