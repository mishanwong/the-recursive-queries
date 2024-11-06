import React from "react";
import styled from "styled-components";
import { Button } from "./Button";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  height: 30px;
  width: 250px;
`;

const NonInput = styled.div`
  height: 30px;
  width: 250px;
`;

export const UpdateForm = ({ tableName, attributes, selected }) => {
  return (
    <div>
      <h2>Update {tableName}</h2>
      <StyledForm onSubmit={() => console.log("Submit")}>
        {attributes.map((input, index) => (
          <InputGroup key={index}>
            <label key={index}>{input.label}</label>
            {index === 0 ? (
              <NonInput>{selected[input.name] || input.value}</NonInput>
            ) : (
              <>
                <Input
                  type={input.type || "text"}
                  name={input.name}
                  placeholder={input.placeholder}
                  value={selected[input.name] || ""}
                  disabled={input.disabled || false}
                  onChange={() => console.log("Handle change")}
                />
              </>
            )}
          </InputGroup>
        ))}
        <ButtonContainer>
          <Button text="Save" />
          <Button text="Cancel" />
        </ButtonContainer>
      </StyledForm>
    </div>
  );
};
