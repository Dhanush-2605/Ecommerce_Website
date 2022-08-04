import React, { Component, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { mobile } from "../Responsive";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethod";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userRedux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
//Styling left part
const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

//Styling Center Part
const Center = styled.div`
  flex: 3;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
//Right Part
const Right = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-around;
  ${mobile({ justifyContent: "center", flex: 2 })}
  flex: 1;
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  const quantity = useSelector((state) => state.cart.quantity);

  const handleClick = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Dhanush.</Logo>
        </Center>
        <Right>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <MenuItem>Register</MenuItem>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <MenuItem>Login</MenuItem>
          </Link>

          <MenuItem onClick={handleClick}>Logout</MenuItem>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </MenuItem>
          </Link>
          <Link to="/profile">
            <Image src={user.currentUser.img} alt="user" />
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
