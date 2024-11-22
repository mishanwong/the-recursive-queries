import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: var(--onyx);
  color: white;
  border: none;
  border-radius: 5px;
`;
export const Button = ({ text, type }) => {
  return <StyledButton type={type}>{text}</StyledButton>;
};
