import { getAllAuction, getAllAuctionExcept } from "@/apis";
import SingleProduct from "@/component/SingleProduct";
import { RootState } from "@/facilities/store";
import { Auction } from "@/utils/Types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GridLoader } from "react-spinners";

const AuctionPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.user);

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(getAllAuction(), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(data);
      setAuctions(data.auctions);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAuctionsExcept = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(getAllAuctionExcept(), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(data);
      console.log(loading);
      setAuctions(data.auctions);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userInfo._id === "") {
      fetchAuctions();
    } else {
      fetchAuctionsExcept();
    }
  }, []);

  if (auctions.length === 0) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <GridLoader loading={true} />
      </div>
    );
  }

  return (
    <div className="mt-28">
      <div className="grid grid-cols-4 gap-4">
        {auctions.map((auction: Auction, index) => (
          <Link to={`/auction/get/${auction._id}`} key={index}>
            <SingleProduct product={auction.item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AuctionPage;
