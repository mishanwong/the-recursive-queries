import React, { useState } from "react";
import { Table } from "../components/Table";
import { Form } from "../components/Form";

export const Categories = () => {
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(null);

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

  const handleFromTable = (data) => {
    setType(data[0]);
    if (data.length > 1) {
      setSelected(data[1]);
    }
  };
  return (
    <div>
      <h1>Categories</h1>
      <Table
        data={sampleData}
        fromTable={handleFromTable}
      />
      <Form
        tableName="Category"
        attributes={attributes}
        selected={selected}
        type={type}
      />
    </div>
  );
};
