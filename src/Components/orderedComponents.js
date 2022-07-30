import React from "react";
import styled from "styled-components";

const Component = styled.div`
  width: 40vw;
  /* height: 30vh; */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  row-gap: 100px;
  column-gap: 50px;
  row-gap: 30px;
  justify-content: space-around;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 30px 0px;
  align-items: center;
  justify-content: space-around;
`;
const Img = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 20px;
  object-fit: cover;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
`;
const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const OrderedComponents = (props) => {
  const { img, quantity, productName, price } = props;
  return (
    <Component>
      <Wrapper>
        <Div>
          <Img src={img} />
        </Div>
        <DetailDiv>
          <h1>{productName}</h1>
          <h1>{quantity}</h1>
        </DetailDiv>
        <Div>
          <p>$ {price}</p>
        </Div>
      </Wrapper>
    </Component>
  );
};

export default OrderedComponents;
