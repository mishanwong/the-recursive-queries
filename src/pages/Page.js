import React, { useState } from "react";
import { Form } from "../components/Form";
import { Table } from "../components/Table";

export const Page = ({ sampleData, attributes, tableName, headers }) => {
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(null);

  const handleFromTable = (data) => {
    setType(data[0]);
    if (data.length > 1) {
      setSelected(data[1]);
    }
  };

  return (
    <div>
      <div>
        <Table
          headers={headers}
          data={sampleData}
          attributes={attributes}
          fromTable={handleFromTable}
        />
        <Form
          tableName={tableName}
          attributes={attributes}
          selected={selected}
          type={type}
        />
      </div>
    </div>
  );
};
