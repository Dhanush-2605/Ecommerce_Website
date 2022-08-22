import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  align-items: center;

  width: 100vw;
  flex-direction: column;
  

  
`;
const Div = styled.div`
/* margin: 30px 0px; */
align-items: flex-start;
/* margin-left: 0px; */

  /* width: 100%; */
`;
const Input = styled.input``;
const ReviewButton = styled.button``;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30vw;
  

 
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Right = styled.div`
  flex: 3;
`;
const Bottom = styled.div`
  display: flex;
  margin-top: 20px;
  /* justify-content: flex-start; */
  align-items: center;


`;
const Img = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
`;
const InnerDiv = styled.div`
  /* background-color: rebeccapurple; */
  /* margin-left: 0px; */
`;
const Wrapper=styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 30px;


`
const Review = () => {
  const product = useSelector((state) => state.product.products);
  console.log(product);
  // console.log(data.reviews.map((item)=>console.log(item)));
  //   console.log(data.reviews);
  // const
  return (
    <Container>
      {product.reviews.map((review) => {
        return (
          <Div>
          <Wrapper>
              <Top>
              <Left>
                <Img
                  src={
                    review.img ||
                    "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
                  }
                  alt="img"
                />
                <h2>{review.username}</h2>
              </Left>
              <Right></Right>
            </Top>
            <Bottom>
              <InnerDiv>
                <p>{review.review}</p>
              </InnerDiv>
            </Bottom>
            </Wrapper>
          </Div>
        );
      })}
    </Container>
  );
};

export default Review;

// {Product!==null &&
//     <Div>
//       {Product.reviews.map((review)=>{
//         return (
//           <div>
//           <p>{review.username}</p>
//           <p>{review.review}</p>
//           </div>
//         )
//       })
//       }
//     </Div>
