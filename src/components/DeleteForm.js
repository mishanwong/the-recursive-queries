import React from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { url } from "../data/sampleData";

const StyledForm = styled.form``;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const Item = styled.div`
  height: 30px;
  display: grid;
  grid-template-columns: 1fr 4fr;
`;
export const DeleteForm = ({ tableName, attributes, selected, refresh }) => {
  console.log(selected);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Deleting...");
    fetch(`${url}/sales_products_delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: selected["saleProductId"] }),
    })
      .then((response) => response.json())
      .then((data) => refresh());
  };
  return (
    <div>
      <h2>Delete {tableName}</h2>
      <StyledForm onSubmit={handleSubmit}>
        {attributes.map((item, index) => (
          <Item key={index}>
            <div>{item.label}:</div>
            <div>{selected[item.name]}</div>
          </Item>
        ))}
        <ButtonContainer>
          <Button
            type="submit"
            text="Delete"
          />
          <Button text="Cancel" />
        </ButtonContainer>
      </StyledForm>
    </div>
  );
};
