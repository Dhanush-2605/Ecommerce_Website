import React from "react";
import Announcements from "../Components/Announcements";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import Category from "../Components/Category";
import Products from "../Components/Products";
import Newsletter from "../Components/Newsletter";
const Home = () => {
  return (
    <div>
      <Announcements />
      <Navbar />
      <Slider />
      <Category />
      <Products />
      <Newsletter />
    </div>
  );
};

export default Home;
