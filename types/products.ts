export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
}
export interface IProductResponse {
  success: boolean;
  message: string;
  data: any;
  count?: number;
}
