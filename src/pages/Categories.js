import React from "react";
import { Page } from "./Page";

export const Categories = () => {
  const sampleData = [
    { categoryId: 1, name: "Health and Beauty" },
    { categoryId: 2, name: "Snacks" },
    { categoryId: 3, name: "Paper" },
    { categoryId: 4, name: "Prepared Food" },
    { categoryId: 5, name: "Drinks" },
  ];

  const attributes = [
    { label: "Category ID", name: "categoryId" },
    { label: "Name", name: "name" },
  ];

  return (
    <div>
      <h1>Categories</h1>
      <Page
        sampleData={sampleData}
        attributes={attributes}
        tableName="Category"
      />
    </div>
  );
};
