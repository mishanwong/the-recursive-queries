import React from "react";
import { Page } from "./Page";

export const Locations = () => {
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

  return (
    <div>
      <h1>Locations</h1>
      <Page
        sampleData={sampleData}
        attributes={attributes}
        tableName="Location"
      />
    </div>
  );
};
