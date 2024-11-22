import React from "react";
import { AddForm } from "./AddForm";
import { UpdateForm } from "./UpdateForm";
import { DeleteForm } from "./DeleteForm";

export const Form = ({ tableName, type, attributes, selected, refresh }) => {
  return (
    <div>
      {type === "add" && (
        <AddForm
          tableName={tableName}
          attributes={attributes}
          refresh={refresh}
        />
      )}
      {type === "edit" && (
        <UpdateForm
          tableName={tableName}
          attributes={attributes}
          selected={selected}
          refresh={refresh}
        />
      )}
      {type === "delete" && (
        <DeleteForm
          tableName={tableName}
          attributes={attributes}
          selected={selected}
          refresh={refresh}
        />
      )}
    </div>
  );
};
