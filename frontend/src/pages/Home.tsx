// import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mt-28">
      <Link to={"/my/product"}>My Product</Link>
    </div>
  );
};

export default Home;
