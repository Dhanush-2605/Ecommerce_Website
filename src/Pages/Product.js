import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Announcements from "../Components/Announcements";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../Responsive";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addProduct } from "../redux/cartRedux";
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  height: 90vh;
  object-fit: fit;
  ${mobile({ height: "45vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  display: flex;
  margin: 30px 0px;
  width: 50%;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;
const Button = styled.button`
  padding: 15px;
  cursor: pointer;
  border: 2px solid teal;
  font-weight: 500;
  background-color: white;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const select = useSelector((state) => state.cart);


  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/find/" + id
        );
        setProduct(res.data);
        console.log(res.data);
      } catch (err) {
        console.log("ERROR");
      }
    };
    getData();
  }, [id]);
  const price = product.price;

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 0 ? setQuantity(quantity - 1) : setQuantity(0);
    } else {
      setQuantity(quantity + 1);
    }
  };
 
  const handleClick = () => {
  
    console.log(quantity);
    console.log(price);
    dispatch(
      addProduct({ ...product, quantity: quantity, color: color, size: size })
    );
  };

  return (
    <Container>
      <Navbar />
      <Announcements />
      <Wrapper>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>${product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => {
                return (
                  <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                );
              })}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(event) => setSize(event.target.value)}>
                {product.size?.map((s) => {
                  return <FilterSizeOption key={s}>{s}</FilterSizeOption>;
                })}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
