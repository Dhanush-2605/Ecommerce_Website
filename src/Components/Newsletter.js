import styled from "styled-components";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { mobile } from "../Responsive";
const Container = styled.div`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fcf5f5;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;
const Input = styled.input`
  border: none;
  padding: 10px;
  padding-left: 20px;
  flex: 8;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  padding: 8px 10px;
`;
function Newsletter() {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>
        Get timely updates from your favourite products.
      </Description>
      <InputContainer>
        <Input placeholder="Enter Email" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
}

export default Newsletter;
