import React from "react";
import { Page } from "./Page";
import {
  productsLocations,
  productsLocationsHeaders,
} from "../data/sampleData";

export const ProductsLocations = () => {
  const attributes = [
    { label: "ID", name: "productLocationId", type: "text" },
    { label: "Product", name: "product", type: "text" },
    { label: "Location", name: "location", type: "text" },
    { label: "Quantity", name: "quantity", type: "text" },
  ];
  return (
    <div>
      <h1>ProductsLocations</h1>
      <Page
        headers={productsLocationsHeaders}
        sampleData={productsLocations}
        attributes={attributes}
        tableName="ProductLocation"
      />
    </div>
  );
};
