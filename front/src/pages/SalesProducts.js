import React, { useState } from "react";
import { Table } from "../components/Table";
import { Form } from "../components/Form";

export const SalesProducts = () => {
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(null);

  const sampleData = [
    { saleProductId: 1, productId: 2, saleId: 3, quantity: 2, lineTotal: 5 },
    { saleProductId: 2, productId: 2, saleId: 3, quantity: 2, lineTotal: 5 },
    { saleProductId: 3, productId: 2, saleId: 3, quantity: 2, lineTotal: 5 },
    { saleProductId: 4, productId: 2, saleId: 3, quantity: 2, lineTotal: 5 },
    { saleProductId: 5, productId: 2, saleId: 3, quantity: 2, lineTotal: 5 },
  ];

  const attributes = [
    { label: "Sale Product ID", name: "saleProductId" },
    { label: "Product ID", name: "productId" },
    { label: "Sale ID", name: "saleId" },
    { label: "Quantity", name: "quantity" },
    { label: "Line Total", name: "lineTotal" },
  ];
  const handleFromTable = (data) => {
    setType(data[0]);
    if (data.length > 1) {
      setSelected(data[1]);
    }
  };
  return (
    <div>
      <h1>SalesProducts</h1>
      <Table
        data={sampleData}
        fromTable={handleFromTable}
      />
      <Form
        tableName="SaleProduct"
        attributes={attributes}
        selected={selected}
        type={type}
      />
    </div>
  );
};
