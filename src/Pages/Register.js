import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../Responsive";
import { publicRequest, userRequest } from "../requestMethod";
import { useNavigate } from "react-router-dom";

import shopping from "../Assests/shopping.svg";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  /* background: linear-gradient(
      rgba(225, 225, 225, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center; */
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ flexDirection: "column-reverse" })}
`;
const Wrapper = styled.div`
  width: 70%;
  /* height: 100vh; */
  height: 40vh;
  ${mobile({ width: "75%" })}
  padding: 40px;
  margin: auto;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 20px;
`;
const Button = styled.button`
  padding: 15px 20px;
  border: none;
  /* width: 50%; */
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Link = styled.a`
  margin: 5px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 10px;
`;
const Left = styled.div`
  flex: 1;
  height: 100vh;
  ${mobile({ width: "100%", height: "20vh" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  ${mobile({
    flex: 3,
    height: "60vh",
    marginTop: "-200px",
  })}/* background-color: red; */
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const changeHandler = (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const res = await userRequest.post("auth/register", userData);
   
      alert("successfully registered");
  

    console.log(res);
  };
  return (
    // <Container>
    //   <Wrapper>
    //     <Title>CREATE ACCOUNT</Title>
    //     <Form>
    //       <Input placeholder="name" name="name" onChange={changeHandler}></Input>
    //       <Input placeholder="last name"  name="lastname" onChange={changeHandler}></Input>
    //       <Input placeholder="username" name="username" onChange={changeHandler}></Input>
    //       <Input placeholder="email" name="email" onChange={changeHandler}></Input>
    //       <Input placeholder="password" name="password" onChange={changeHandler}></Input>
    //       <Input placeholder="confirm password" name="confirm password" onChange={changeHandler}></Input>
    //       <Agreement>
    //         By creating an account, I consent to the processing of my
    //         personaldata in accordance with the <b>PRIVACY POLICY</b>
    //       </Agreement>
    //       <Button onClick={submitHandler}>CREATE ACCOUNT</Button>
    //     </Form>
    //   </Wrapper>
    // </Container>

    <Container>
      <Left>
        <img src={shopping} alt="shoppingimage" />
      </Left>
      <Right>
        <Wrapper>
          <Title>CREATE ACCOUNT</Title>
          <Form>
            <Input
              placeholder="name"
              name="name"
              onChange={changeHandler}
              autoComplete="off"
            ></Input>
            <Input
              placeholder="last name"
              name="lastname"
              onChange={changeHandler}
              autoComplete="off"
            ></Input>
            <Input
              placeholder="username"
              name="username"
              onChange={changeHandler}
              autoComplete="off"
            ></Input>
            <Input
              placeholder="email"
              name="email"
              onChange={changeHandler}
              autoComplete="off"
            ></Input>
            <Input
              placeholder="password"
              name="password"
              type="password"
              onChange={changeHandler}
              autoComplete="off"
            ></Input>
            <Input
              placeholder="confirm password"
              name="confirm password"
              type="password"
              onChange={changeHandler}
              autoComplete="off"
            ></Input>
            <Agreement>
              By creating an account, I consent to the processing of my
              personaldata in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <ButtonDiv>
              <Button onClick={submitHandler}>CREATE ACCOUNT</Button>
            </ButtonDiv>
          </Form>
          <Div>
            <Link href="/login">LOGIN</Link>
          </Div>
        </Wrapper>
      </Right>
    </Container>
  );
}
export default Register;
