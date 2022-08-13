import axios from "axios";

export const createProductService = async (
  formData: FormData,
  { title, description, price, categoryId, storeId }: any
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image/upload`, {
    method: "POST",
    body: formData,
  });
  const data: any = await res.json();

  const { id, format, name, publicId, secure_url, url, version } = data;

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
