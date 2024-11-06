import React, { useState } from "react";
import { Table } from "../components/Table";
import { Form } from "../components/Form";

export const ProductsLocations = () => {
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(null);

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
  const handleFromTable = (data) => {
    setType(data[0]);
    if (data.length > 1) {
      setSelected(data[1]);
    }
  };
  return (
    <div>
      <h1>ProductsLocations</h1>
      <Table
        data={sampleData}
        fromTable={handleFromTable}
      />
      <Form
        tableName="ProductLocation"
        attributes={attributes}
        selected={selected}
        type={type}
      />
    </div>
  );
};
