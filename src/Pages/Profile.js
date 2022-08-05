import { style } from "@mui/system";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { mobile } from "../Responsive";
import { userRequest } from "../requestMethod";
import app from "../firebase.js";
import { useSelector } from "react-redux";
import { loginSuccess } from "../redux/userRedux";
import { setNavImage } from "../redux/userRedux";
import { useDispatch } from "react-redux";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
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
  width: 100%;
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
  /* padding: 10px;
  margin:50x; */
  display: none;
  background-color: teal;
`;
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100px;
  width: 200px;
`;
const UploadButton=styled.button`
  padding: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
  background-color:dodgerblue;
  color: white;
`
const Profile = () => {
  const [userData, setUserData] = useState({});
  const [password, setNewPassword] = useState("");
  const [image, setImage] = useState({});
  const [profile,setProfile]=useState("");
  const [file, setFile] = useState();
  const fileButton=useRef();

  const User = useSelector((state) => state.user.currentUser);
  const dispatch=useDispatch();

  console.log(User);

  const profileHandler = (e) => {
    // try{
    //   if (preview){
    //     imageProfile.img=preview;
    // const res=await userRequest.put(`users/profile/${User._id}}`,preview);

    // console.log(res);
    //   }
    // }catch(err){
    //   console.log(err);
    // }


    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // const product = { ...inputs, img: downloadURL, categories: cat };
          // console.log(product);
          setImage(() => {
            return {
              img: downloadURL,
            };
          });

          // const res = await userRequest.put(`users/profile/${User._id}}`,img)

          // console.log(downloadURL);
          // addProduct(product, dispatch);
        });
      }
    );
  };
  console.log(image);
  useEffect(() => {
    const updatedProfile = async () => {
      try {
        if (image) {
          const res = await userRequest.put(`users/${User._id}`, image);

          console.log(res.data);
          dispatch(setNavImage(res.data.img));
          setProfile(res.data.img);
        }
      } catch (err) {
        console.log(err);
      }
    };
    updatedProfile();
  },[image,User._id,dispatch]);





  const passwordHandler=async()=>{
    try{
      // const res=await userRequest.put(`users/${User._id}`,data);


    }catch(err){
      console.log(err);

    }
  }
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

  // const updateProfile=async()=>{

  // }

  // console.log(preview);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>My Profile</Title>
          <TopDiv>
            <Img src={profile} alt="image" />
          </TopDiv>
          <TopDiv>
            <ButtonDiv>
              <UploadButton onClick={(event)=>{event.preventDefault();fileButton.current.click()}}>choose image</UploadButton>

              <File
                type="file"
                name="img"
                id="img"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                ref={fileButton}
              />
              <Button onClick={profileHandler}>Update Profile</Button>
            </ButtonDiv>
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
