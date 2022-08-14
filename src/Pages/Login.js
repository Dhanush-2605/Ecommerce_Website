import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../Responsive";
import { useDispatch } from "react-redux";
import { login } from "../redux/apiCalls";
import { useSelector } from "react-redux";
import loginPage from "../Assests/loginPage.svg";
import { ToastContainer } from "react-toastify";
import { notifySuccess,notifyFailure,notifyInfo} from "../Components/alert";
const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ flexDirection:"column-reverse" })}
`;
const Wrapper = styled.div`
  width: 50%;
 
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
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  padding: 15px 20px;
  border: none;

  background-color: teal;
  color: white;
  cursor: pointer;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Link = styled.a`
  margin: 5px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 10px;
`;
const Error = styled.span`
  color: red;
`;
const Left = styled.div`
  flex: 1;
  height: 60vh;
  ${mobile({ width:"100%"})}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;


`;
const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 20px;
`;

const Div=styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
margin-top: 10px;
`
const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);


  const dispatch = useDispatch();

  const handleClick = (event) => {
    event.preventDefault();
    if (username!=="" && password!==""){
      login(dispatch, { username, password });
    }
    else{
      notifyInfo("Enter Valid Credntails");
    }

   
  };
  return (
    <Container>
    <Left>
    <img src={loginPage} alt="img"></img>

    </Left>
    <Right>

    <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="name"
            onChange={(event) => setUserName(event.target.value)}
            autoComplete="off"
          ></Input>

          <Input
            placeholder="password"
            type="password"
            autoComplete="off"
            onChange={(event) => setPassword(event.target.value)}
          ></Input>
          <ButtonDiv>
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          </ButtonDiv>
          <Div>

          {error && <Error>{error}</Error>}
          <Link>Do Not YOU REMEMBER THE PASSWORD</Link>
          <Link href="/register">CREATE A NEW ACCOUNT</Link>
          </Div>
        </Form>
      </Wrapper>

    </Right>
    <ToastContainer />

    </Container>
  );
};



export default Login;
