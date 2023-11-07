import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/facilities/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SingleProduct from "@/component/SingleProduct";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { createAuction } from "@/apis";
import { ClipLoader } from "react-spinners";

const AddToAuction = () => {
  //getting product from redux store
  const { singleProduct } = useSelector((state: RootState) => state.products);

  const [auctionData, setAuctionData] = useState({
    bidIncrement: "",
    startingPrice: "",
    timeLimit: "",
  });

  const [loading, setLoading] = useState(false);
  //handle time limit
  const [selectedTime, setSelectedTime] = useState("");
  const [timeDifference, setTimeDifference] = useState<string>();

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputTime = e.target.value;
    const currentTime = new Date();
    const inputDate = new Date(currentTime.toDateString() + " " + inputTime);

    if (inputDate >= currentTime) {
      setSelectedTime(inputTime);
      const minutesDifference = Math.round(
        (inputDate.getTime() - currentTime.getTime()) / (1000 * 60)
      );
      setTimeDifference(String(minutesDifference));
    } else {
      toast.error("invalid time");
      setSelectedTime("");
      setTimeDifference("");
    }
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      const formData = {
        itemId: singleProduct._id,
        bidIncrement: auctionData.bidIncrement,
        startingPrice: auctionData.startingPrice,
        timeLimit: timeDifference,
      };
      const values = Object.values(formData);
      for (let i = 0; i < values.length; i++) {
        if (values[i] === "") {
          toast.error("Please fill all the fields");
          setLoading(false);
          return;
        }
      }
      console.log(formData);
      const { data } = await axios.post(createAuction(), formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(data);
      setLoading(false);
      toast.success("Auction Created");
      setAuctionData({
        bidIncrement: "",
        startingPrice: "",
        timeLimit: "",
      });
      setTimeDifference("");
      setSelectedTime("");
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
      console.log(error);
      setAuctionData({
        bidIncrement: "",
        startingPrice: "",
        timeLimit: "",
      });
      setTimeDifference("");
      setSelectedTime("");
    }
  };

  return (
    <div className="mt-28">
      <SingleProduct product={singleProduct} />
      <Card>
        <CardHeader>
          <CardTitle>Auction Details</CardTitle>
          <CardDescription>Fill the details for auction</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="bidIncrement">Bid Increment</Label>
            <Input
              type="number"
              id="bidIncrement"
              placeholder="Enter bid increment"
              value={auctionData.bidIncrement}
              onChange={(e) =>
                setAuctionData({ ...auctionData, bidIncrement: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="timeLimit">End Time For Auction</Label>
            <Input
              type="time"
              id="timeLimit"
              value={selectedTime}
              onChange={handleTimeChange}
            />
          </div>
          <div>
            <Label htmlFor="startingPrice">Starting Price</Label>
            <Input
              type="number"
              id="startingPrice"
              placeholder="Enter starting price"
              value={auctionData.startingPrice}
              onChange={(e) =>
                setAuctionData({
                  ...auctionData,
                  startingPrice: e.target.value,
                })
              }
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={submitHandler} variant="outline" disabled={loading}>
            {loading ? "Please wait" : "Submit"}
            <span className="mx-2 flex items-center">
              <ClipLoader loading={loading} size={20} />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddToAuction;
