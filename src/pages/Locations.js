import React, { useState } from "react";
import { Table } from "../components/Table";
import { Form } from "../components/Form";

export const Locations = () => {
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(null);

  const sampleData = [
    { locationId: 1, aisle: "A", shelf: "1", slot: "2", capacity: 2 },
    { locationId: 3, aisle: "B", shelf: "2", slot: "4", capacity: 1 },
    { locationId: 3, aisle: "D", shelf: "2", slot: "3", capacity: 4 },
    { locationId: 4, aisle: "A", shelf: "5", slot: "4", capacity: 3 },
    { locationId: 5, aisle: "B", shelf: "4", slot: "5", capacity: 2 },
  ];

  const attributes = [
    { label: "Location ID", name: "locationId" },
    { label: "Aisle", name: "aisle" },
    { label: "Shelf", name: "shelf" },
    { label: "Slot", name: "slot" },
    { label: "Capacity", name: "capacity" },
  ];

  const handleFromTable = (data) => {
    setType(data[0]);
    if (data.length > 1) {
      setSelected(data[1]);
    }
  };
  return (
    <div>
      <h1>Locations</h1>
      <Table
        data={sampleData}
        fromTable={handleFromTable}
      />
      <Form
        tableName="Location"
        attributes={attributes}
        selected={selected}
        type={type}
      />
    </div>
  );
};
