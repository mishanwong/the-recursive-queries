import React from "react";
import { AddForm } from "./AddForm";
import { UpdateForm } from "./UpdateForm";
import { DeleteForm } from "./DeleteForm";

export const Form = ({ tableName, type, attributes, selected }) => {
  return (
    <div>
      {type === "add" && (
        <AddForm
          tableName={tableName}
          attributes={attributes}
        />
      )}
      {type === "edit" && (
        <UpdateForm
          tableName={tableName}
          attributes={attributes}
          selected={selected}
        />
      )}
      {type === "delete" && (
        <DeleteForm
          tableName={tableName}
          attributes={attributes}
          selected={selected}
        />
      )}
    </div>
  );
};
