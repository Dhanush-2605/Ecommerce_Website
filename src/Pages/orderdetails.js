import React, { Fragment } from "react";
import styled from "styled-components";
import { userRequest } from "../requestMethod";
// import { useState,useEffect } from 'react';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import OrderedComponents from "../Components/orderedComponents";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addOrder, cancelOrder } from "../redux/orderRedux";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import dualring from "../Assests/dualring.svg";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  flex-direction: column;
`;
const Product = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
  flex-wrap: wrap;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  /* padding: 30px; */
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px 0px;
`;
const ShippingInfo = styled.div`
  /* width: 50vw; */
  width: 70%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const SpanText = styled.span`
  font-weight: 400;
  margin-left: 20px;
`;
const OrderStatus = styled.div`
  display: flex;
  margin: 20px 0px;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  width: 70%;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: #d11a2a;
  display: flex;
  align-content: center;
  justify-content: center;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;
const HomeButton = styled.button`
  border: none;
  padding: 10px;
  background-color: black;
  color: white;

  border-radius: 5px;

  margin-top: 50px;
  cursor: pointer;
`;

const ItemsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const TextDiv = styled.div`
  display: flex;
  width: 50%;
  margin: auto;
  align-items: center;
  justify-content: space-around;
`;
const NoOrderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;
const OrderDetails = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [orderedItems, setOrderItems] = useState([]);

  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);

  const handleOrderStatus = async () => {
    try {
      const res = await userRequest.put(`orders/${currentUser._id}`, {
        status: "order cancelled by user",
      });
      dispatch(cancelOrder());
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.get(`/orders/find/${id}`);

        console.log(res.data);
        dispatch(addOrder(res.data));
        setOrderItems(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    createOrder();
  }, [currentUser, id, dispatch]);
  console.log(orderedItems);
  const cancelHandler = async () => {
    try {
      const res = await userRequest.put(`/orders/find/${id}`);

      console.log(res);
      dispatch(cancelOrder());
      setOrderItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {order.orders[0].length !== 0 ? (
        <>
          <Container>
            {order.orders[0].length !== 0 ? (
              <ShippingInfo>
                <Title>
                  <h1>Shipping Details</h1>
                </Title>

                <TextDiv>
                  <Div>
                    <h3>Name</h3>
                  </Div>
                  <Div>
                    <SpanText>{orderedItems.name}</SpanText>
                  </Div>
                </TextDiv>
                <TextDiv>
                  <Div>
                    <h3>Address</h3>
                  </Div>
                  <Div>
                    <SpanText>{orderedItems.number}</SpanText>
                  </Div>
                </TextDiv>
                <TextDiv>
                  <Div>
                    <h3>Number</h3>
                  </Div>
                  <Div>
                    <SpanText>{orderedItems.address}</SpanText>
                  </Div>
                </TextDiv>
              </ShippingInfo>
            ) : (
              <img src={dualring} alt="img" />
            )}
            <OrderStatus>
              <Title>Order Status</Title>
              <h4>{order.orders[0].status}</h4>
            </OrderStatus>
            <Product>
              <Title>Ordered Items</Title>
              {order.orders.length !== 0 ? (
                <>
                  {order.orders[0].products.map((item) => {
                    return (
                      <ItemsDiv>
                        <OrderedComponents
                          key={item._id}
                          img={item.productImg}
                          quantity={item.quantity}
                          productName={item.productName}
                          price={item.price * item.quantity}
                        />
                      </ItemsDiv>
                    );
                  })}
                </>
              ) : (
                <img src={dualring} alt="img" />
              )}
            </Product>
            <Button onClick={handleOrderStatus}>
              <ClearIcon style={{ marginTop: "-4px", marginRight: "5px" }} />
              <span>Cancel Order</span>
            </Button>

            {/* </div> */}
          </Container>
        </>
      ) : (
        <NoOrderDiv>
          <Title>No Orders</Title>
          <RemoveShoppingCartIcon style={{ fontSize: "100px", color: "red" }} />
          <HomeButton>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Back To Home Page
            </Link>
          </HomeButton>
        </NoOrderDiv>
      )}
    </>
  );
};

export default OrderDetails;
