import React, { useState } from "react";
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

const StyledSelect = styled.select`
  height: 30px;
  line-height: 30px;
`;

export const UpdateForm = ({ tableName, attributes, selected, refresh }) => {
  const [formValues, setFormValues] = useState(selected);
  console.log(selected);

  const handleSubmit = (e) => {
    console.log("Submitting...");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <div>
      <h2>Update {tableName}</h2>
      <StyledForm onSubmit={handleSubmit}>
        {attributes.map((attr, index) => (
          <div key={index}>
            {attr.update && (
              <InputGroup key={index}>
                <label key={index}>{attr.label}:</label>
                {attr.type !== "dropdown" && index !== 0 && (
                  <>
                    <Input
                      type={attr.type}
                      name={attr.name}
                      placeholder={attr.placeholder}
                      value={selected[attr.name] || ""}
                      disabled={attr.disabled || false}
                      onChange={handleInputChange}
                    />
                  </>
                )}
                {attr.type === "dropdown" && (
                  <>
                    <StyledSelect
                      name={attr.name}
                      value={formValues[attr.name]}
                      onChange={handleInputChange}
                    >
                      {attr.options.map((option, i) => (
                        <option
                          key={i}
                          value={option[attr.displayField]}
                        >
                          {option[attr.displayField]}
                        </option>
                      ))}
                    </StyledSelect>
                  </>
                )}
              </InputGroup>
            )}
          </div>
        ))}
        <ButtonContainer>
          <Button
            type="submit"
            text="Save"
          />
          <Button text="Cancel" />
        </ButtonContainer>
      </StyledForm>
    </div>
  );
};
