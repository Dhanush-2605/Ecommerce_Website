import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  align-items: center;

  width: 90vw;
  /* width: 50%; */
  justify-content: space-around;
  overflow: wrap;

  flex-direction: column;
`;
const Div = styled.div`
  /* margin: 30px 0px; */
  /* align-items: flex-start; */
  /* margin-left: 0px; */

  /* width: 100%; */
  column-gap: 212px;
  row-gap: 100px;
`;
const Input = styled.input``;
const ReviewButton = styled.button``;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* width: 30vw; */
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
`;

const Right = styled.div`
  /* flex: 3; */
  justify-content: flex-end;
`;
const Bottom = styled.div`
  display: flex;
  margin-top: 20px;
  /* justify-content: flex-start; */
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;
const InnerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
`;
const Wrapper = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 30px;
  width: 300px;
  height: 150px;
  row-gap: 100px;
  row-gap: 20px;
  margin: 20px 20px;
`;

const P = styled.p`
  text-align: center;
`;
const H3 = styled.h3`
  margin-left: 20px;
  font-weight: 500;
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Review = () => {
  const product = useSelector((state) => state.product.products);
  console.log(product);
  // console.log(data.reviews.map((item)=>console.log(item)));
  //   console.log(data.reviews);
  // const
  return (
    <Container>
      {product.reviews!= null && (
        <Main>
          {product.reviews.map((review, ind) => {
            return (
              <Wrapper key={ind}>
                <Top>
                  <Left>
                    <Img
                      src={
                        review.img ||"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiMwMDgwODAiPjxwYXRoIGQ9Ik04NiwxNC4zMzMzM2MtMzkuNTgxNSwwIC03MS42NjY2NywzMi4wODUxNyAtNzEuNjY2NjcsNzEuNjY2NjdjMCwzOS41ODE1IDMyLjA4NTE3LDcxLjY2NjY3IDcxLjY2NjY3LDcxLjY2NjY3YzM5LjU4MTUsMCA3MS42NjY2NywtMzIuMDg1MTcgNzEuNjY2NjcsLTcxLjY2NjY3YzAsLTM5LjU4MTUgLTMyLjA4NTE3LC03MS42NjY2NyAtNzEuNjY2NjcsLTcxLjY2NjY3ek04NiwzNC4wNDE2N2MxMi44NjQxNywwIDIzLjI5MTY3LDEwLjQyNzUgMjMuMjkxNjcsMjMuMjkxNjdjMCwxMi44NjQxNyAtMTAuNDI3NSwyMy4yOTE2NyAtMjMuMjkxNjcsMjMuMjkxNjdjLTEyLjg2NDE3LDAgLTIzLjI5MTY3LC0xMC40Mjc1IC0yMy4yOTE2NywtMjMuMjkxNjdjMCwtMTIuODY0MTcgMTAuNDI3NSwtMjMuMjkxNjcgMjMuMjkxNjcsLTIzLjI5MTY3ek04NiwxNDMuMzMzMzNjLTE5Ljg1MTY3LDAgLTM3LjMzODMzLC0xMC4wOTA2NyAtNDcuNjI5NjcsLTI1LjQyMDE3YzguMDMzODMsLTExLjY4MTY3IDMzLjYyNiwtMTcuNTc5ODMgNDcuNjI5NjcsLTE3LjU3OTgzYzE0LjAwMzY3LDAgMzkuNTk1ODMsNS44OTgxNyA0Ny42Mjk2NywxNy41Nzk4M2MtMTAuMjkxMzMsMTUuMzI5NSAtMjcuNzc4LDI1LjQyMDE3IC00Ny42Mjk2NywyNS40MjAxN3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
                        
                      }
                      alt="img"
                    />
                    <H3>{review.username}</H3>
                  </Left>
                  <Right>
                    <span>{review.date}</span>
                  </Right>
                </Top>
                <Bottom>
                  <InnerDiv>
                    <P>{review.review}</P>
                  </InnerDiv>
                </Bottom>
              </Wrapper>
            );
          })}
        </Main>
      )}
    </Container>
  );
};

export default Review;
