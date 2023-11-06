import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import SingleProductPage from "./pages/SingleProductPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add/product" element={<AddProduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
};

export default App;
