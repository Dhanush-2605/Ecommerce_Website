import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  font-size: 14px;
  justify-content: center;
  font-weight: 500;
`;

const Announcements = () => {
  return <Container>Announcements offer going on here</Container>;
};

export default Announcements;
