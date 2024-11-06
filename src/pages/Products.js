import React, { useState } from "react";
import { Table } from "../components/Table";
import { Form } from "../components/Form";

export const Products = () => {
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(null);
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

  const handleFromTable = (data) => {
    setType(data[0]);
    if (data.length > 1) {
      setSelected(data[1]);
    }
  };
  return (
    <div>
      <h1>Products</h1>
      <Table
        data={sampleData}
        fromTable={handleFromTable}
      />
      <Form
        tableName="Product"
        attributes={attributes}
        selected={selected}
        type={type}
      />
    </div>
  );
};
