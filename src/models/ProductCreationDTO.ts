export default interface ProductCreationDTO {
  id: number;
  title: string;
  description: string;
  price: number;
  image: FormData;
  categoryId: number;
  storeId: number;
}
