import React from "react";
import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Link } from "react-router-dom";
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-in;
  cursor: pointer;
`;
const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  /* flex-direction: column; */
  background-color: #f5fbfd;

  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin: 10px;
  transition: all 0.5s ease-in;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
function Product(props) {
  
  
  return (
    <Container>
      <Circle />
      <Image src={props.item.img} />
      <Info>
        <Icon>
          <ShoppingCartIcon />
        </Icon>
        <Icon>
          <Link to={`/product/${props.item._id}`}>
            <SearchIcon />
          </Link>
        </Icon>
        <Icon>
          <FavoriteIcon />
        </Icon>
      </Info>
    </Container>
  );
}

export default Product;
