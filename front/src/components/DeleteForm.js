import React from "react";
import styled from "styled-components";
import { Button } from "./Button";

const StyledData = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const Item = styled.div`
  height: 30px;
  display: grid;
  grid-template-columns: 1fr 4fr;
`;
export const DeleteForm = ({ tableName, attributes, selected }) => {
  return (
    <div>
      <h2>Delete {tableName}</h2>
      <StyledData>
        {attributes.map((item, index) => (
          <Item key={index}>
            <div>{item.label}:</div>
            <div>{selected[item.name]}</div>
          </Item>
        ))}
      </StyledData>
      <ButtonContainer>
        <Button text="Delete" />
        <Button text="Cancel" />
      </ButtonContainer>
    </div>
  );
};
