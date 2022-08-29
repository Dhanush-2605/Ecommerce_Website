import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethod";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import OrderedComponents from "../Components/orderedComponents";
import { useDispatch } from "react-redux";
import { addOrder } from "../redux/orderRedux";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  height: 100vh;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px 0px;
`;
const Span = styled.span`
  font-weight: bold;
  margin-left: 5px;
`;
const Left = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;
const Right = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Top = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width: 70%;
`;

const Bottom = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  flex-direction: column;
`;

const PaymentInfo = styled.div``;

const OrderInfo = styled.div``;

const Success = () => {
  const location = useLocation();

  const [orderedItems, setOrderItems] = useState([]);
  console.log(orderedItems);
  const currentUser = useSelector((state) => state.user.currentUser);
  const order = useSelector((state) => state.order.orders);

  const orderId = location.state.orderId;
  console.log(orderId);

  const data = location.state.razorData;
  const cart = location.state.products;
  console.log(cart);
  const address = location.state.address;
  const number = location.state.number;
  const dispatch = useDispatch();

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          name: currentUser.username,
          products: cart.products.map((item) => ({
            productId: item._id,
            productName: item.title,
            quantity: item.quantity,
            productImg: item.img,
            price: item.price,
          })),
          address: address,
          amount: cart.total,
          number: number,
        });
        setOrderItems(res.data);
        dispatch(addOrder(res.data));
        const main = await userRequest.post("/stats", {
          products: cart.products.map((item) => ({
            productId: item._id,
            price: item.price,
          })),
          amount: cart.total,
        });
        console.log(main);
      } catch (err) {
        console.log(err);
      }
    };
    data && createOrder();
  }, [cart, data, currentUser, address, number, dispatch]);

  console.log(order);

  return (
    <Container>
      <Left>
        {orderId ? (
          <Div>
            <div>
              {" "}
              <CheckCircleIcon style={{ color: "#42ba96", fontSize: "70px" }} />
            </div>
            <div>
              <p>
                Order has been created successfully. Your order Id is{" "}
                <Span>{orderId}</Span>
              </p>
            </div>
          </Div>
        ) : (
          <Div>
            <div>
              <RunningWithErrorsIcon
                style={{ color: "#ff9966", fontSize: "70px" }}
              />{" "}
            </div>
            <div>
              <p> Your order is being prepared...</p>
            </div>
          </Div>
        )}
        <Link to={`/orderdetails/${orderedItems._id}`}>
          <button
            style={{
              padding: 10,
              marginTop: 80,
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
            }}
          >
            Order Details
          </button>
        </Link>
      </Left>
      {/* <Right>
        <Top></Top>
        <Bottom>
          <Title>
            <h1>Ordered Items</h1>
          </Title>
        </Bottom>
      </Right> */}
    </Container>
  );
};

export default Success;
