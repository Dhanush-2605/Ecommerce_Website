import React from "react";
import styled from "styled-components";

const Component = styled.div`
  width: 80%;
  display: flex;
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
const OrderedComponents = (props) => {
  const { img, quantity, productName, price } = props;
  return (
    <Component>
      <Div>
        <Img src={img} />
      </Div>
      <Div>
        <h1>{productName}</h1>
        <h1>{quantity}</h1>
      </Div>
      <Div>
        <p>{price}</p>
      </Div>
    </Component>
  );
};

export default OrderedComponents;
