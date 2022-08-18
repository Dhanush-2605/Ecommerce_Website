import React, { useEffect, useState } from "react";
import { popularProducts } from "../data";
import { publicRequest, userRequest } from "../requestMethod";
import Product from "./Product";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Products = ({ cat, filters, sort , type }) => {
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProducts] = useState([]);
  const [ProductType,setProductType]=useState([]);
  console.log(type);
  // console.log(props);
  console.log(filters);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
        console.log(res);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  


  // console.log(arr);
  
  useEffect(()=>{
    if (products && type){
    let arr=products.filter((item)=>
    
    item.categories.includes(type)
    
)
      console.log(arr);

    }




  },[type,products]);

  console.log(ProductType);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) => {
        [...prev].sort((a, b) => a.createdAt - b.createdAt);
      });
    } else if (sort === "asc") {
      setFilteredProducts((prev) => {
        [...prev].sort((a, b) => a.price - b.price);
      });
    } else {
      setFilteredProducts((prev) => {
        [...prev].sort((a, b) => b.price - a.price);
      });
    }
  }, [sort]);

  console.log(filteredProduct);
  return (
    <Container>
      {filteredProduct
        ? filteredProduct.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
