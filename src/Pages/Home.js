import React from "react";
import Announcements from "../Components/Announcements";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import Category from "../Components/Category";
import Products from "../Components/Products";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import { useDispatch,useSelector } from "react-redux";
import { setNavImage } from "../redux/userRedux";

const Home = () => {
  const dispatch=useDispatch();
  const User = useSelector((state) => state.user.currentUser);
  dispatch(setNavImage(User.img));

  return (
    <div>
      <Announcements />
      <Navbar />
      <Slider />
      <Category />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
