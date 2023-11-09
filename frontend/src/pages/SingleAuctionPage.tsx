import { buyPorduct, createBid, getAuctionById, getHighestBid } from "@/apis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/facilities/store";
import { Auction, Bid } from "@/utils/Types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setAuctionInfo } from "@/facilities/auctionSlice";

const SingleAuctionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [placeBid, setPlaceBid] = useState<string>("");
  const [auctionEnds, setAuctionEnds] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.user);
  // const { auctionInfo } = useSelector((state: RootState) => state.auction);

  //   const [chatHistory, setChatHistory] = useState<string[]>([]);

  const { id } = useParams();
  const [highestBid, setHighestBid] = useState<Bid>();

  const fetchHighestBid = async () => {
    try {
      const { data } = await axios.get(getHighestBid(id));

      const bid = {
        amount: 0,
        user: { name: "" },
      };
      console.log(data);
      setHighestBid(data.bid == null ? bid : data.bid);
    } catch (error) {
      console.log(error);
    }
  };

  const [auction, setAuction] = useState<Auction>();
  const fetchAuction = async () => {
    try {
      const { data } = await axios.get(getAuctionById(id));
      console.log(data);
      setAuction(data.auctions);
      dispatch(setAuctionInfo(data.auctions));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceBid = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceBid(e.target.value);
    const msg = {
      type: "place-bid",
      value: e.target.value,
      bidder: userInfo.name,
    };
    setMessage(JSON.stringify(msg));
  };

  const handleSubmit = () => {
    if (ws && message && highestBid) {
      console.log(JSON.parse(message));
      if (Number(placeBid) > highestBid?.amount) {
        ws.send(message);
        handleCreateBid();
      } else {
        toast.error("Please enter amount more than current highest");
      }
      // setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
      setMessage("");
    } else {
      toast.error("Please enter amount");
    }
  };

  const handleCreateBid = async () => {
    try {
      const bidData = {
        amount: placeBid,
        itemId: auction?.item._id,
      };
      // const values = Object.values(bidData);
      // for (let i = 0; i < values.length; i++) {
      //   if (values[i] === "") {
      //     toast.error("Please fill all the fields");
      //     return;
      //   }
      // }
      console.log(bidData);
      const { data } = await axios.post(createBid(), bidData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setHighestBid(data.bid);
      console.log(data);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAgain = async () => {
    const { data } = await axios.get(getAuctionById(id));
    const formData = {
      sellerId: data.auctions.item.seller,
      itemId: data.auctions.item._id,
    };
    return formData;
  };
  const handleBuy = async () => {
    try {
      toast.success("Item purchased successfully");
      // setLoading(true);
      const formData = await fetchAgain();
      console.log(formData);
      const { data } = await axios.post(buyPorduct(), formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(data);
      // setLoading(false);
    } catch (error: any) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  const handleBack = () => {
    navigate("/product");
  };

  useEffect(() => {
    fetchAuction();
    fetchHighestBid();
  }, []);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");
    setWs(socket);

    socket.addEventListener("open", () => {
      console.log("Connected to the WebSocket server");
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      // console.log(data);
      if (data.type === "highest-bid") {
        console.log(data);
        const hiBid: Bid = {
          amount: data.value,
          bidder: {
            name: data.bidder,
            _id: "",
            email: "",
            password: "",
            soldItems: [],
            purchasedItems: [],
          },
          item: "",
        };
        setHighestBid(hiBid);
      }
      if (data.type === "auction-end") {
        setAuctionEnds(true);
        handleBuy();
      }
    });

    socket.addEventListener("close", () => {
      console.log("Connection closed");
      setWs(null);
    });

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // useEffect(() => {
  //   fetchHighestBid();
  // }, [highestBid]);

  if (auctionEnds || auction?.item.isSold) {
    return (
      <div className="mt-28 flex h-[70vh] flex-col items-center justify-center">
        <div className="m-2 text-2xl font-bold text-slate-800">
          Auction Ended
        </div>
        <div className="m-2 text-xl font-semibold text-slate-800">
          Item sold to {highestBid?.bidder.name} at Rs {highestBid?.amount}
        </div>
        <div>
          <Button variant={"outline"} onClick={handleBack}>
            Go to Product page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-44 mt-28">
      <div className="flex">
        <div className="flex w-2/5 flex-col items-center">
          <div>
            <img
              src={auction?.item.image}
              alt="image"
              className="h-52 w-full object-contain"
            />
          </div>
          <div className="m-3 font-semibold">{auction?.item.name}</div>
        </div>
        <div className="w-3/5">
          <div className="m-2 text-xl font-semibold">
            Auction ends at : <span>{auction?.endTime}</span>
          </div>
          <div className="m-2 text-xl font-semibold">
            Highest bid : {highestBid?.amount}
          </div>
          <div className="m-2 text-xl font-semibold">
            Highest bidder : {highestBid?.bidder?.name}
          </div>

          <div>
            <Label htmlFor="placeBid">Enter Your Bid</Label>
            <Input
              id="placeBid"
              placeholder="Enter amount"
              value={placeBid}
              onChange={(e) => handlePlaceBid(e)}
            />
            <Button variant={"outline"} onClick={handleSubmit} className="my-2">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAuctionPage;
