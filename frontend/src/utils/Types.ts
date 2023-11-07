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
  item: string;
  bidIncrement: number;
  timeLimit: number;
  startingPrice: number;
  seller: string;
  isSold: boolean;
}
