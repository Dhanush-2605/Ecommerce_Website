import React, { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethod";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
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
  /* height:100vh; */
  align-items: center;
  justify-content: center;
`;
const Right = styled.div`
  display: flex;
  flex: 1;
  /* width: 100%; */
  /* height: 100vh; */
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
  /* background-color: red; */
`;

const Bottom = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  flex-direction: column;
`;
const ShippingInfo = styled.div`
  /* width: 50vw; */
  width: 100%;
`;
const PaymentInfo = styled.div``;

const OrderInfo = styled.div``;
const Product = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const SpanText=styled.span`
font-weight: 400;
margin-left: 20px;

`
const Success = () => {
  const location = useLocation();
  const [orderedItems, setOrderItems] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);
  // setOrderId(location.state.orderId);
  const orderId = location.state.orderId;
  console.log(orderId);

  const data = location.state.razorData;
  const cart = location.state.products;
  console.log(cart);
  const address = location.state.address;
  const number = location.state.number;
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item.id,
            productName:item.title,
            quantity: item.quantity,
            productImg: item.img,
          })),
          address: address,
          amount: cart.total,
          number: number,
          status: "order confirmed",
        });
        console.log(res);
        setOrderItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    data && createOrder();
  }, [cart, data, currentUser, address, number]);

  // const success=
  // const processing=

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
        <Link to="/">
          <button
            style={{
              padding: 10,
              marginTop: 80,
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
            }}
          >
            Go to Homepage
          </button>
        </Link>
      </Left>
      <Right>
        <Top>
          <ShippingInfo>
            <Title>
              <h1>Shipping Details</h1>
            </Title>
            <Div>
              <h3>Name  <SpanText>Dhanush</SpanText></h3>
            
            </Div>
            <Div>
            <h3>Name  <SpanText>Dhanush</SpanText></h3>
            </Div>
            <Div>
            <h3>Name  <SpanText>Dhanush</SpanText></h3>
            </Div>
  
          </ShippingInfo>
        </Top>
        <Bottom>
          <Title>
            <h1>Ordered Items</h1>
          </Title>
          <Product>
          {orderedItems.length!==0?
          <>{orderedItems.products.map((item)=>{
            return (
              <div>
              <img src={item.productImg} alt="img" />
              <h1>{item.productName}</h1>
              <h1>{item.quantity}</h1>

              </div>
            )
          })}
          </>
          :<h1>loading</h1>}

          </Product>
        </Bottom>
      </Right>
    </Container>
  );
};

export default Success;

{
  /* <PaymentInfo>
    <Title>Payment</Title>
    <ul>
      <li>Paid</li>
      <li>Amount   : 95678</li>
    
    </ul>
    

    </PaymentInfo>
    <OrderInfo>
    <Title>Order Status</Title>
    <p>shipped</p>

    

    </OrderInfo> */
}
