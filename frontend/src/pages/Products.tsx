import { getAllProduct } from "@/apis";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../facilities/store";
import { GridLoader } from "react-spinners";
import SingleProduct from "../component/SingleProduct";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  description: string;
  image: string;
  isSold: boolean;
  name: string;
  price: number;
  seller: string;
}

const Products = () => {
  const [products, setProducts] = useState([]);
  const { keyword } = useSelector((state: RootState) => state.products);

  const fetchProducts = async () => {
    const { data } = await axios.get(getAllProduct() + `?keyword=${keyword}`);
    console.log(data.items);
    setProducts(data.items);
  };

  useEffect(() => {
    fetchProducts();
  }, [keyword]);

  if (products.length == 0) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <GridLoader loading={true} />
      </div>
    );
  }

  return (
    <div className="mx-44 mt-28">
      <div className="grid grid-cols-4 gap-4">
        {products.map((product: Product, index) => (
          <Link to={`/product/${product._id}`} key={index}>
            <SingleProduct product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
