import React from "react";
import { Page } from "./Page";

export const ProductsLocations = () => {
  const sampleData = [
    { productLocationId: 1, productId: 1, locationId: 2, quantity: 5 },
    { productLocationId: 2, productId: 1, locationId: 2, quantity: 5 },
    { productLocationId: 3, productId: 1, locationId: 2, quantity: 5 },
    { productLocationId: 4, productId: 1, locationId: 2, quantity: 5 },
    { productLocationId: 5, productId: 1, locationId: 2, quantity: 5 },
  ];

  const attributes = [
    { label: "Product Location ID", name: "productLocationId" },
    { label: "Product ID", name: "productId" },
    { label: "Location ID", name: "locationId" },
    { label: "Quantity", name: "quantity" },
  ];
  return (
    <div>
      <h1>ProductsLocations</h1>
      <Page
        sampleData={sampleData}
        attributes={attributes}
        tableName="ProductLocation"
      />
    </div>
  );
};
