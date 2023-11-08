import { getMyProducts } from "@/apis";
import SingleProduct from "@/component/SingleProduct";
import { Button } from "@/components/ui/button";
import { Product } from "@/utils/Types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GridLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setSingleProduct } from "@/facilities/productSlice";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(getMyProducts(), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(data);
      setProducts(data.items);
      setLoading(false);
      console.log(loading);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const addToAuctionHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    console.log(e);
    dispatch(setSingleProduct(product));
    navigate("/auction/add");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (products.length === 0) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <GridLoader loading={true} />
      </div>
    );
  }
  return (
    <div className="mt-28">
      <div>Items to be sold</div>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product: Product, index) => (
          <div
            key={index}
            className={`${
              !product.isSold && !product.isAddedToAuction ? "flex" : "hidden"
            } flex-col items-center`}
          >
            {!product.isSold && <SingleProduct product={product} />}
            <div>
              <Button
                className="m-2"
                variant={"outline"}
                onClick={(e) => addToAuctionHandler(e, product)}
              >
                Add to auction
              </Button>
              <Button className="m-2" variant={"outline"}>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div>Items added to auction</div>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product: Product, index) => (
          <div
            key={index}
            className={`${product.isAddedToAuction ? "block" : "hidden"}`}
          >
            {product.isAddedToAuction && <SingleProduct product={product} />}
          </div>
        ))}
      </div>

      <div>Items sold</div>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product: Product, index) => (
          <div key={index} className={`${product.isSold ? "block" : "hidden"}`}>
            {product.isSold && <SingleProduct product={product} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
