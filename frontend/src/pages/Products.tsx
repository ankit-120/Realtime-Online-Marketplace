import { getAllProduct, getAllProductExcept } from "@/apis";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../facilities/store";
import { GridLoader } from "react-spinners";
import SingleProduct from "../component/SingleProduct";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product } from "@/utils/Types";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { keyword } = useSelector((state: RootState) => state.products);
  const { userInfo } = useSelector((state: RootState) => state.user);

  const fetchProducts = async () => {
    const { data } = await axios.get(getAllProduct() + `?keyword=${keyword}`);
    console.log(data.items);
    setProducts(data.items);
  };

  const fetchProductsExcept = async () => {
    console.log(getAllProductExcept() + `?keyword=${keyword}`);
    const { data } = await axios.get(
      getAllProductExcept() + `?keyword=${keyword}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(data.items);
    setProducts(data.items);
  };

  useEffect(() => {
    if (userInfo.name != "") {
      console.log(userInfo);
      fetchProductsExcept();
    } else {
      console.log("not");
      fetchProducts();
    }
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
      <Button variant={"outline"} onClick={fetchProductsExcept}>
        click
      </Button>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product: Product, index) => (
          <Link to={`/product/${product._id}`} key={index}>
            {!product.isSold && <SingleProduct product={product} />}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
