import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../Responsive";
import { publicRequest, userRequest } from "../requestMethod";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(225, 225, 225, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  ${mobile({ width: "75%"})}
  padding: 20px;
  background-color: white;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.p`
  font-size: 12px;
  margin: 20px 10px;
`;
const Button = styled.button`
  padding: 15px 20px;
  border: none;
  width: 40%;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

function Register() {
  const navigate=useNavigate();
  const [userData,setUserData]=useState({});




  const changeHandler=(e)=>{
    setUserData((prev)=>{
      return {
        ...prev,
        [e.target.name]:e.target.value
      }
    })

  }
  const submitHandler=async(event)=>{

    event.preventDefault();
    const res = await userRequest.post("auth/register",userData);
    navigate("/");
    console.log(res);



  }
  return (
    <Container>
      <Wrapper>
        <Title>CREATE ACCOUNT</Title>
        <Form>
          <Input placeholder="name" name="name" onChange={changeHandler}></Input>
          <Input placeholder="last name"  name="lastname" onChange={changeHandler}></Input>
          <Input placeholder="username" name="username" onChange={changeHandler}></Input>
          <Input placeholder="email" name="email" onChange={changeHandler}></Input>
          <Input placeholder="password" name="password" onChange={changeHandler}></Input>
          <Input placeholder="confirm password" name="confirm password" onChange={changeHandler}></Input>
          <Agreement>
            By creating an account, I consent to the processing of my
            personaldata in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={submitHandler}>CREATE ACCOUNT</Button>
        </Form>
      </Wrapper>
    </Container>
  );
}
export default Register;
