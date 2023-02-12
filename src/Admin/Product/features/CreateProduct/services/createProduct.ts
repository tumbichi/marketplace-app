import axios from "axios";
import ImageData from "../../../../../models/ImageData";
import ProductCreationDTO from "../../../../../models/ProductCreationDTO";

export const createProductService = async ({
  title,
  description,
  price,
  image,
  categoryId,
  storeId,
}: Omit<ProductCreationDTO, "id">): Promise<ProductCreationDTO> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image/upload`, {
    method: "POST",
    body: image,
  });
  const imageData: ImageData = await res.json();

  const { id, format, name, publicId, secure_url, url, version } = imageData;

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    title,
    description,
    price,
    imageUrl: secure_url,
    categoryId,
    storeId,
  });

  return Promise.resolve(response.data);
};
