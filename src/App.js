import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Product from "./Pages/Product";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Success from "./Pages/Success";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderDetails from "./Pages/orderdetails";
import Profile from "./Pages/Profile";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Routes>
      {/* <Route path="/test" element={<Login />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/products/:category" element={<ProductList />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      {/* <Route path="/login" element={<Login />} /> */}

      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

      <Route path="/success" element={<Success />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orderdetails/:id" element={<OrderDetails />} />

      {/* <ProductList /> */}
      {/* <Product /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Cart /> */}
    </Routes>
  );
}

export default App;
