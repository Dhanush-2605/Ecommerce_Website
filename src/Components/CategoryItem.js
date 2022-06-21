
import React from "react";
import styled from "styled-components";
import { mobile } from "../Responsive";
import { Link } from "react-router-dom";
const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  /* margin:10px; */
  /* position: absolute; */
  object-fit: cover;
  ${mobile({ height: "30vh" })}
`;
const Info = styled.div`
  position: absolute;
  /* background-color: red; */

  height: 100%;
  width: 100%;
  top:0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  font-weight: 600;
  color: gray;
  background-color: white;
  cursor: pointer;
`;
const CategoryItem = ({item}) => {
  return (
    <Container>
    <Link to={`/products/${item.cat}`}>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
    </Link>
    </Container>
  );
};

export default CategoryItem;
