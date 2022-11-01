export default interface Product {
  title: string;
  description: string;
  price: number;
  imageUrl: FormData;
  categoryId?: number;
  storeId: number;
}
