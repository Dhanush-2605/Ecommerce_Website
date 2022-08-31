import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Announcements from "../Components/Announcements";
import Products from "../Components/Products";
import Footer from "../Components/Footer";
import Newsletter from "../Components/Newsletter";
import { mobile } from "../Responsive";
import { useLocation } from "react-router-dom";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;

  margin: 20px;

  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

function ProductList() {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [type, settype] = useState("");
  const [sort, setSort] = useState("newest");

  const handleFilters = (event) => {
    const value = event.target.value;
    setFilters({
      ...filters,
      [event.target.name]: value,
    });

    console.log(filters);
  };

  const handleType = (event) => {
    settype(event.target.value);
  };

  console.log(filters);

  return (
    <Container>
      <Navbar />
      <Announcements />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="type" onChange={handleType}>
            <Option disabled>Size</Option>
            <Option>jeans</Option>
            <Option>short</Option>
            <Option>coat</Option>
            <Option>trouser</Option>
            <Option>shirt</Option>
          </Select>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>color</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>Xs</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>

        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select
            onChange={(event) => {
              setSort(event.target.value);
            }}
          >
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="dsc">Price (dsc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} type={type} />
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default ProductList;
