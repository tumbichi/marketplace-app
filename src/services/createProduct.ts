import axios from "axios";

export const createProductService = async (
  formData: FormData,
  { title, description, price, categoryId, storeId }: any
) => {
  const res = await fetch("http://localhost:8080/image/upload", {
    method: "POST",
    body: formData,
  });
  const data: any = await res.json();

  const { id, format, name, publicId, secure_url, url, version } = data;
  //   .then((res) => res.json())
  //   .then((data) => console.log("data :>> ", data))
  //   .catch((e) => console.log("e :>> ", e));

  const response = await axios.post("http://localhost:8080/products", {
    title,
    description,
    price,
    imageUrl: secure_url,
    categoryId,
    storeId,
  });

  return Promise.resolve(response.data);
};
