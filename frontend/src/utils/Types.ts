export interface Product {
  _id: string;
  description: string;
  image: string;
  isSold: boolean;
  name: string;
  price: number;
  seller: string;
  isAddedToAuction: boolean;
}

export interface Auction {
  _id: string;
  item: Product;
  bidIncrement: number;
  timeLimit: number;
  endTime: string;
  startingPrice: number;
  seller: string;
  isSold: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Bid {
  amount: number;
  item: string;
  bidder: User;
}
