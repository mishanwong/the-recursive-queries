import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  th,
  td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: var(--raisin-black);
    color: white;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
    transition: background-color 0.3s ease;
  }

  @media (max-width: 600px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;

    th,
    td {
      padding: 10px;
      font-size: 14px;
    }
  }
`;

const Action = styled.div`
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;

export const Table = ({ data, fromTable, headers, attributes }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <StyledTable>
      <thead>
        <tr>
          {attributes.map((attr, index) => (
            <th key={index}>{attr.label}</th>
          ))}
          <th key="new">
            <Action onClick={() => fromTable(["add"])}>New</Action>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {attributes.map((attr, colIndex) => (
              <td key={colIndex}>{row[attr.name]}</td>
            ))}
            <td>
              <Action onClick={() => fromTable(["edit", row])}>Edit</Action>{" "}
              <Action onClick={() => fromTable(["delete", row])}>Delete</Action>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};
