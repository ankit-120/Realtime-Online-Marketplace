import { getProductById } from "@/apis";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { Product } from "@/utils/Types";

const SingleProductPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product>();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(getProductById(id));
      console.log(data);
      setProduct(data.item);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!product) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <GridLoader loading={true} />
      </div>
    );
  }

  return (
    <div className="mx-44 mt-28">
      <div className="flex">
        <div className="w-3/5">
          <img
            src={product.image}
            alt="image"
            className="h-72 w-full object-contain"
          />
        </div>
        <div className="flex w-2/5 flex-col items-center justify-center">
          <div className="my-1 text-3xl font-bold">{product.name}</div>
          <div className="my-1 text-sm">{product.description}</div>
          <div className="my-1 text-xl font-semibold">₹ {product.price}</div>
          <div>
            <Button variant={"outline"}>Buy now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
