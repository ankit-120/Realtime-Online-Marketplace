import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import axios from "axios";
import { addProduct } from "@/apis";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/facilities/store";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { login } = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [productImage, setProductImage] = useState({
    url: "",
    image: null as Blob | null,
  });

  const handleProductImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProductImage({
        url: URL.createObjectURL(e.target.files[0]),
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = Object.values(productData);
      for (let i = 0; i < values.length; i++) {
        if (values[i] === "") {
          toast.error("Please fill all the fields");
          setLoading(false);
          return;
        }
      }
      const formData = new FormData();
      formData.append("data", JSON.stringify(productData));
      if (productImage.image != null) {
        formData.append("image", productImage.image);
      }
      const { data } = await axios.post(addProduct(), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(data);
      setLoading(false);
      toast.success("Product added successfully");
      setProductData({
        name: "",
        price: "",
        description: "",
      });
      setProductImage({
        url: "",
        image: null as Blob | null,
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
      setProductData({
        name: "",
        price: "",
        description: "",
      });
      setProductImage({
        url: "",
        image: null as Blob | null,
      });
    }
  };

  useEffect(() => {
    if (!login) {
      toast.error("Login First");
      navigate("/register");
    }
  }, []);

  return (
    <div className="mt-32">
      <Card>
        <CardHeader>
          <CardTitle>Add Product details</CardTitle>
          <CardDescription>Fill the details about product</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter product name"
              value={productData.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="price">Product Price</Label>
            <Input
              type="number"
              id="price"
              placeholder="Enter product price"
              value={productData.price}
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
            />
          </div>
          {/* <div>
            <Label htmlFor="stock">Product Stock</Label>
            <Input
              type="number"
              id="stock"
              placeholder="Enter product stock"
              value={productData.stock}
              onChange={(e) =>
                setProductData({ ...productData, stock: e.target.value })
              }
            />
          </div> */}
          <div>
            <Label htmlFor="description">Product Description</Label>
            <Input
              type="text"
              id="description"
              placeholder="Enter product description"
              value={productData.description}
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="Image">Product Image</Label>
            <Input
              type="file"
              id="name"
              placeholder="Add product image"
              onChange={(e) => handleProductImage(e)}
            />
            <div>
              {productImage.url != "" && (
                <img src={productImage.url} className="h-28 w-28" />
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant={"outline"} onClick={handleSubmit} disabled={loading}>
            {loading ? "Please wait" : "Add Product"}
            <ClipLoader loading={loading} size={20} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddProduct;
