import React, { useState } from "react";
import { Table } from "../components/Table";
import { Form } from "../components/Form";

export const Sales = () => {
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(null);

  const sampleData = [
    { saleId: 1, date: "2024-06-06", customerId: 1 },
    { saleId: 2, date: "2024-06-30", customerId: 2 },
    { saleId: 3, date: "2024-07-14", customerId: 3 },
  ];

  const attributes = [
    { label: "Sale ID", name: "saleId" },
    { label: "Date", name: "date" },
    { label: "Customer ID", name: "customerId" },
  ];

  const handleFromTable = (data) => {
    setType(data[0]);
    if (data.length > 1) {
      setSelected(data[1]);
    }
  };
  return (
    <div>
      <h1>Sales</h1>
      <Table
        data={sampleData}
        fromTable={handleFromTable}
      />
      <Form
        tableName="Sale"
        attributes={attributes}
        selected={selected}
        type={type}
      />
    </div>
  );
};
