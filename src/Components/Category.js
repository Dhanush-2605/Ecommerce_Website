import React from "react";

import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { categories } from "../data";
import { mobile } from "../Responsive";
const Container = styled.div`
  display: flex;
  padding: 20px;

  justify-content: space-between;
  ${mobile({
    padding: "0px",
    flexDirection: "column",
  })}/* flex-direction: column; */
`;
const  Category=()=>{
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
}

export default Category;
