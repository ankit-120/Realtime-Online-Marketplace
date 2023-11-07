import React from "react";
import { Product } from "@/utils/Types";

const SingleProduct: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="flex  flex-col items-center bg-slate-100 px-10 py-5 transition-transform duration-100 hover:scale-105 hover:shadow-lg ">
      <div>
        <img
          src={product.image}
          alt="product"
          className="h-60 w-full object-contain"
        />
      </div>
      <div className="font-semibold text-slate-800">{product.name}</div>
      <div className="text-sm">₹ {product.price}</div>
    </div>
  );
};

export default SingleProduct;
