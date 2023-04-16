export interface ICreateProductValues {
  title: string;
  description: string;
  price: number;
}
export interface IProductCreateResponse {
  success: boolean;
  message: string;
  data: any;
}
