import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { userRequest } from "../requestMethod";
import Announcements from "../Components/Announcements";
import Footer from "../Components/Footer";

import Navbar from "../Components/Navbar.js";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { emptyCart } from "../redux/cartRedux";

import { mobile } from "../Responsive";
import { itemAddHandler, itemRemoveHandler, dummy } from "../redux/cartRedux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Image = styled.img`
  width: 200px;
  ${mobile({ width: "80vw" })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;

  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 55vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Address = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 0.5px solid lightgray;
  flex-wrap: wrap;
  padding: 10px;
`;
const Input = styled.input`
  padding: 10px;
  margin: 5px;
  border: 1px solid black;
`;
const AddressButton = styled.button`
  width: 50%;
  padding: 10px;
  margin-top: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Cart = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);

  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [deliver, setDeliver] = useState({});

  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(emptyCart());
  };

  console.log(process.env.REACT_APP_RAZORPAY_KEY_ID);

  const initPayment = (data) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: 1000,
      currency: "USD",
      order_id: data.id,
      handler: async (response) => {
        try {
          const res = await userRequest.post("/checkout/verify", response);
          console.log(res);
          navigate("/success", {
            state: {
              razorData: res.data,
              products: cart,
              orderId: data.id,
              address: deliver.address,
              number: deliver.number,
            },
          });
        } catch (err) {
          console.log(err);
        }
      },
    };
    const razorpayObj = new window.Razorpay(options);

    razorpayObj.open();
  };

  const changeHandler = (event) => {
    setDeliver((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };
  const addressHandleClick = async () => {
    try {
      const res = await userRequest.put(`users/${currentUser._id}`, deliver);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    setShowCheckOut((prev) => {
      return !prev;
    });
  };
  const checkouthandleClick = async () => {
    try {
      const res = await userRequest.post("/checkout/payment", {
        amount: cart.total * 100,
        currency: "USD",
      });

      console.log(res.data);
      setOrderId(res.data.id);

      initPayment(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(orderId);
  const addHandler = (data) => {
    dispatch(itemAddHandler(data));
  };

  const removeHandler = (data) => {
    dispatch(itemRemoveHandler(data));
  };
  return (
    <Container>
      <Navbar />
      <Announcements />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled" onClick={handleClick}>
            EMPTY CART
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <AddIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        addHandler(product._id);
                      }}
                    />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <RemoveIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        removeHandler(product._id);
                      }}
                    />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>

            {showCheckOut && (
              <Button onClick={checkouthandleClick}>CHECKOUT NOW</Button>
            )}
            {!showCheckOut && (
              <Address>
                <Input
                  onChange={changeHandler}
                  name="address"
                  type="text"
                  placeholder="Address"
                  autoComplete="off"
                ></Input>
                <Input
                  onChange={changeHandler}
                  name="number"
                  type="tel"
                  placeholder="Mobile Number"
                  autoComplete="off"
                ></Input>
                <AddressButton onClick={addressHandleClick}>
                  DELIVER HERE
                </AddressButton>
              </Address>
            )}

            <Button style={{ marginTop: "30px" }}>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/orderdetails/${currentUser._id}`}
              >
                ORDER DETAILS
              </Link>
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>

      <Footer />
    </Container>
  );
};

export default Cart;
