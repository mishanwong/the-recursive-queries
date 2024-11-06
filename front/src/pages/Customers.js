import React, { useState } from "react";
import { Table } from "../components/Table";
import { Form } from "../components/Form";
export const Customers = () => {
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(null);

  const sampleData = [
    { customerId: 1, name: "Sam S" },
    { customerId: 2, name: "MJ Lee" },
    { customerId: 3, name: "Kate Cole" },
    { customerId: 4, name: "Abdul Smith" },
    { customerId: 5, name: "Sven Garcia" },
  ];

  const attributes = [
    { label: "Customer ID", name: "customerId" },
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
      <h1>Customers</h1>
      <Table
        data={sampleData}
        fromTable={handleFromTable}
      />
      <Form
        tableName="Customer"
        attributes={attributes}
        selected={selected}
        type={type}
      />
    </div>
  );
};
