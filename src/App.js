import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Product from "./Pages/Product";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import { Routes, Route ,Redirect} from "react-router-dom";
function App() {
  const user=true;
  return (
    <Routes>
      <Route path="/" element={ <Home />} /> 
      <Route path="/products/:category" element={ <ProductList />} /> 
      <Route path="/product/:id" element={ <Product />} /> 
      <Route path="/cart" element={ <Cart />} /> 
      <Route path="/login" element={ <Login />} /> 
      <Route path="/register" element={ <Register />} /> 
       
      

      {/* <ProductList /> */}
      {/* <Product /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Cart /> */}
    </Routes>
  );
}

export default App;
