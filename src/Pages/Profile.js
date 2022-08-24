import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { mobile } from "../Responsive";
import { userRequest } from "../requestMethod";
import app from "../firebase.js";
import { useSelector } from "react-redux";
import { setNavImage } from "../redux/userRedux";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

import { notifySuccess, notifyFailure } from "../Components/alert";

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
  &:hover {
    box-shadow: teal 0px 0.25em 1em;
    transition: box-shadow 1s ease-in-out;
  }
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
const UploadButton = styled.button`
  padding: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
  background-color: dodgerblue;
  color: white;
`;
const Profile = () => {
  const [password, setNewPassword] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState({});
  const [profile, setProfile] = useState("");
  const [file, setFile] = useState();
  const fileButton = useRef();
  var dateobj = 
   new Date('2022-06-24T14:16:08.493Z');


  const User = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  console.log(User);

  const profileHandler = (e) => {
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
          setImage(() => {
            return {
              img: downloadURL,
            };
          });
          if (downloadURL) {
            notifySuccess("Successfully Uploaded");
          } else {
            notifyFailure("Upload Failed!!");
          }
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

          setProfile(res.data.img);
        }
      } catch (err) {
        console.log(err);
      }
    };
    updatedProfile();
  }, [image, User._id, dispatch]);

  const passwordHandler = async () => {
    console.log(password);
    try {
      const res = await userRequest.put(`users/${User._id}`, password);
      res && notifySuccess("Sucessfully Updated");
    } catch (err) {
      console.log(err);
      notifyFailure("Updation Failed");
    }
  };

  const passwordChangeHandler = (event) => {
    setNewPassword((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };
  const showPasswordHandler = () => {
    setShowPassword((prev) => {
      return !prev;
    });
  };

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
              <UploadButton
                onClick={(event) => {
                  event.preventDefault();
                  fileButton.current.click();
                }}
              >
                choose image
              </UploadButton>

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
            <p>{(User.createdAt.split("T")[0])}</p>
          </Div>

          <Div>
            <Button onClick={showPasswordHandler}>Change Password</Button>
          </Div>
        </Right>
      </Wrapper>
      {showPassword && (
        <Update>
          <Div>
            <Input
              placeholder="Password"
              type="password"
              name="confirm password"
              onChange={passwordChangeHandler}
            ></Input>
          </Div>
          <Div>
            <Input
              placeholder="New Password"
              type="password"
              onChange={passwordChangeHandler}
              name="password"
            ></Input>
          </Div>
          <Div>
            <Button onClick={passwordHandler}>Update</Button>
          </Div>
        </Update>
      )}
      <ToastContainer />
    </Container>
  );
};

export default Profile;
