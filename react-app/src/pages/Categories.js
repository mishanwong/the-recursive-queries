import React from "react";
import { Page } from "./Page";
import { categories } from "../data/sampleData";

export const Categories = () => {
  const attributes = [
    { label: "ID", name: "categoryId", type: "text" },
    { label: "Name", name: "name", type: "text" },
  ];

  const headers = attributes.map((attr) => attr.label);
  console.log(headers);

  return (
    <div>
      <h1>Categories</h1>
      <Page
        headers={headers}
        sampleData={categories}
        attributes={attributes}
        tableName="Category"
      />
    </div>
  );
};
