import { Item } from "./item.model";

export interface Order {
  orderId: number;
  productId:number;
  productName: string;
  userName: string;
  mobileNumber: string;
  orderStatus: number;
  totalPrice: number;
  createdDate: Date;
  paymentMode: string;
  price:number;
  quantity:number;
  address:string;
  sellerId:number;
  userId:number;
  image:string;

}
