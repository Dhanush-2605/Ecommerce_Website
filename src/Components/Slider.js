import styled from "styled-components";
import ArrowLeftOutlined from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlined from "@mui/icons-material/ArrowRightOutlined";

const Container = styled.div`
  background-color: coral;
  display: flex;
  /* align-items: center;
justify-content: space-between; */
  height: 100vh;
  position: relative;
  width: 100%;
`;
const Arrow = styled.div`
  width: 50px;
  border-radius: 50%;
  background-color: #fff7f7;
  height: 50px;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};

  justify-content: center;
`;
const Slider = () => {
  return (
    <Container>
      <Arrow direction="left">
        <ArrowLeftOutlined />
      </Arrow>
      <Arrow direction="right">
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
