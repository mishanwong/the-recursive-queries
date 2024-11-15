import React, { useState } from "react";
import { Table } from "../components/Table";
import { Form } from "../components/Form";
import { customers, customersHeaders } from "../data/sampleData";

export const Customers = () => {
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(null);

  const attributes = [
    { label: "ID", name: "customerId", type: "text" },
    { label: "Name", name: "name", type: "text" },
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
        headers={customersHeaders}
        data={customers}
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
