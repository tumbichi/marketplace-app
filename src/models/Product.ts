export default interface Product {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  stock: boolean;
  active: boolean;
  count: number;
  categoryId: number;
  storeId: number;
}
