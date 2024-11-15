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

const StyledSelect = styled.select`
  height: 30px;
  line-height: 30px;
`;

export const UpdateForm = ({ tableName, attributes, selected }) => {
  return (
    <div>
      <h2>Update {tableName}</h2>
      <StyledForm onSubmit={() => console.log("Submit")}>
        {attributes.map((input, index) => (
          <InputGroup key={index}>
            <label key={index}>{input.label}:</label>
            {index === 0 && (
              <NonInput>{selected[input.name] || input.value}</NonInput>
            )}
            {input.type === "text" && index !== 0 && (
              <>
                <Input
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  value={selected[input.name] || ""}
                  disabled={input.disabled || false}
                  onChange={() => console.log("Handle change")}
                />
              </>
            )}
            {input.type === "dropdown" && (
              <>
                <StyledSelect>
                  <option
                    value=""
                    disabled
                  ></option>
                  {input.options.map((option, i) => (
                    <option
                      key={i}
                      value={option.name}
                    >
                      {option.name}
                    </option>
                  ))}
                </StyledSelect>
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
