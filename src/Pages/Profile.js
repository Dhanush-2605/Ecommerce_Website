import { style } from "@mui/system";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { mobile } from "../Responsive";
import { userRequest } from "../requestMethod";
import { useSelector } from "react-redux";
const TopDiv = styled.div`
  margin: 60px 0px;
  /* margin: auto; */
  ${mobile({ margin: "10px 0px" })}
`;
const Div = styled.div`
  margin: 40px 0px;
  width: 50%;
  ${mobile({ margin: "10px 0px", width: "100%" })}
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  width: 70vw;
  padding: 40px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  ${mobile({ flexDirection: "column" })}
`;

const Title = styled.div`
  font-size: 24px;
`;
const Left = styled.div`
  display: flex;
  flex: 1;
  /* height: 100vh; */
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  height: 100%;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  object-fit: cover;
  /* margin:60px 0px; */
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: teal;
  color: white;
`;
const Input = styled.input`
  padding: 10px;
  border: 1px solid gray;
`;

const Update = styled.div`
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  margin-top: 20px;
  padding: 20px;
`;
const File = styled.input`
  /* padding: 10px; */
  /* margin:50x; */
  display: none;
  /* background-color: teal; */
`;
const Profile = () => {
  const [userData, setUserData] = useState({});
  const [password, setNewPassword] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef();
  const User = useSelector((state) => state.user.currentUser);
  console.log(User);
  useEffect(()=>{
    if (image){
      const reader= new FileReader();
      reader.onloadend=()=>{
        setPreview(reader.result);
        // console.log(preview);

      }

      reader.readAsDataURL(image);

    }else{
      setPreview(null)


    }

  },[image])


  /* useEffect(()=>{
        const getData=async()=>{
            try{
            const res=await userRequest.get(`users/${User._id}`);
            console.log(res.data);
            setUserData(res.data);
            }catch(err){
                console.log(err);

            }


        }
        getData();

   
      }) */
      console.log(preview);
  return (
    <Container>
      <Wrapper>
        <Left>
          {preview?<img src={preview} />:<img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" /> }
}
          <Title>My Profile</Title>
          <TopDiv>
            {/* <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" /> */}
          </TopDiv>
          <TopDiv>
            <button
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
              }}
            >
              Update Profile
            </button>
            <File type="file" accept="image/*" ref={fileInputRef} onChange={(event)=>{
              const file=event.target.files[0];
              if (file){
                setImage(file);

              }else{
                setImage(null);
              }
            }}></File>
          </TopDiv>
        </Left>
        <Right>
          <Div>
            <h2>User Name</h2>
            <br />
            <p>{User.username}</p>
          </Div>
          <Div>
            <h2>Email</h2>
            <br />
            <p>{User.email}</p>
          </Div>
          <Div>
            <h2>Joined On</h2>
            <br />
            <p>{User.createdAt}</p>
          </Div>

          <Div>
            <Button>Change Password</Button>
          </Div>
        </Right>
      </Wrapper>
      <Update>
        <Div>
          <Input placeholder="Password"></Input>
        </Div>
        <Div>
          <Input placeholder="New Password"></Input>
        </Div>
        <Div>
          <Button>Update</Button>
        </Div>
      </Update>
    </Container>
  );
};

export default Profile;
