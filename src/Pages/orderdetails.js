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
import { red } from "@mui/material/colors";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  flex-direction: column;
  overflow: auto;
`;
const Product = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;

  flex-direction: column;
  flex-wrap: wrap;
  &:hover {box-shadow: teal 0px 0.25em 1em;}
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
  width: 40%;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  &:hover {box-shadow: teal 0px 0.25em 1em;}
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
  padding: 20px;
  width: 40%;
  &:hover {box-shadow: teal 0px 0.25em 1em;}
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
const DeliveredButton = styled.button`
  border: none;
  padding: 10px;
  background-color: lightgreen;
  display: flex;
  align-content: center;
  justify-content: center;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin-top: 30px;
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
const H1 = styled.h1`
  font-weight: 500;
`;
const StatusButton = styled.button`
  padding: 10px 30px;
  font-size: 24px;
  border: none;
  background-color: ${(props) => props.type === "Shipping" && "#ffebbf"};
  background-color: ${(props) => props.type === "Delivered" && "#e5faf2"};
  background-color: ${(props) => props.type === "Pending" && "#ebf1fe"};
  color: ${(props) => props.type === "Delivered" && "#3bb077"};
  color: ${(props) => props.type === "Shipping" && "#de932a"};
  color: ${(props) => props.type === "Pending" && "#2a7ade"};
  border-radius: 10px;
`;
const Span = styled.span`
  margin: 3px 5px;
`;

const OrderDetails = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [orderedItems, setOrderItems] = useState([]);
  // const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const orderStatus = { status: "Canceled" };
  // console.log(order.orders.status);
  // if (order){
  useEffect(() => {
    if (order) {
      const getOrder = async () => {
        try {
          const res = await userRequest.get(`/orders/find/${order.orders._id}`);
          // dispatch(addOrder(res.data));

          console.log(res);

          setOrderItems(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getOrder();
    }
  }, [currentUser, dispatch, order]);

  // }
  console.log(order.orders);

  const handleOrderStatus = async () => {
    try {
      const res = await userRequest.put(`orders/${id}`, orderStatus);
      dispatch(cancelOrder());
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const Status = ({ type }) => {
    // setStatus(type);
    return <StatusButton type={type}>{type}</StatusButton>;
  };
  return (
    <Container>
      {order.orders.length !== 0 ? (
        <Fragment>
          <ShippingInfo>
            <Title>
              <H1>Shipping Details</H1>
            </Title>

            <TextDiv>
              <Div>
                <h3>Name</h3>
              </Div>
              <Div>
                <SpanText>{order.orders.name}</SpanText>
              </Div>
            </TextDiv>
            <TextDiv>
              <Div>
                <h3>Address</h3>
              </Div>
              <Div>
                <SpanText>{order.orders.address}</SpanText>
              </Div>
            </TextDiv>
            <TextDiv>
              <Div>
                <h3>Number</h3>
              </Div>
              <Div>
                <SpanText>{order.orders.number}</SpanText>
              </Div>
            </TextDiv>
          </ShippingInfo>

          <OrderStatus>
            <Title>
              <H1>Order Status</H1>
            </Title>
            <Status type={orderedItems.status}>{orderedItems.status}</Status>
            {orderedItems.status === "Delivered" && (
              <DeliveredButton
                onClick={() => {
                  dispatch(cancelOrder());
                }}
              >
                <TaskAltIcon />
                <Span>OK</Span>
              </DeliveredButton>
            )}
          </OrderStatus>
          <Product>
            <Title>
              <H1>Ordered Items</H1>
            </Title>
            {/* <Product> */}

            {order.orders.products.map((item) => {
              return (
                <ItemsDiv key={item._id}>
                  <OrderedComponents
                    img={item.productImg}
                    quantity={item.quantity}
                    productName={item.productName}
                    price={item.price * item.quantity}
                  />
                </ItemsDiv>
              );
            })}
          </Product>
          <Div>
            <Button onClick={handleOrderStatus}>Cancel Order</Button>
          </Div>
        </Fragment>
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
    </Container>
  );
};

export default OrderDetails;
