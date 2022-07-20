import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethod";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Span = styled.span`
  font-weight: bold;
  margin-left: 5px;
`;
const Success = () => {
  const location = useLocation();
  // const [orderId, setOrderId] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  // setOrderId(location.state.orderId);
  const orderId = location.state.orderId;
  console.log(orderId);

  const data = location.state.razorData;
  const cart = location.state.products;
  const address = location.state.address;
  const number= location.state.number;
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          address:address,
          amount: cart.total,
          number:number,
          status:"order confirmed"
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    data && createOrder();
  }, [cart, data, currentUser,address,number]);

  // const success=
  // const processing=

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
    </div>
  );
};

export default Success;
