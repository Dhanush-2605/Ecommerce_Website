import React from "react";
import Announcements from "../Components/Announcements";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import Category from "../Components/Category";
import Products from "../Components/Products";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
const Home = () => {
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
