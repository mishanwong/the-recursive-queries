import React from "react";
import { Page } from "./Page";
import { locations, locationsHeaders } from "../data/sampleData";

export const Locations = () => {
  const attributes = [
    { label: "ID", name: "locationId", type: "text" },
    { label: "Aisle", name: "aisle", type: "text" },
    { label: "Shelf", name: "shelf", type: "text" },
    { label: "Slot", name: "slot", type: "text" },
    { label: "Capacity", name: "capacity", type: "text" },
  ];

  return (
    <div>
      <h1>Locations</h1>
      <Page
        headers={locationsHeaders}
        sampleData={locations}
        attributes={attributes}
        tableName="Location"
      />
    </div>
  );
};
