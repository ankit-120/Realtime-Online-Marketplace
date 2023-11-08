import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import SingleProductPage from "./pages/SingleProductPage";
import MyProducts from "./pages/MyProducts";
import AddToAuction from "./pages/AddToAuction";
import AuctionPage from "./pages/AuctionPage";
import SingleAuctionPage from "./pages/SingleAuctionPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add/product" element={<AddProduct />} />
          <Route path="/my/product" element={<MyProducts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auction/add" element={<AddToAuction />} />
          <Route path="/auction" element={<AuctionPage />} />
          <Route path="/auction/get/:id" element={<SingleAuctionPage />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
};

export default App;
