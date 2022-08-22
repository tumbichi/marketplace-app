import dynamic from "next/dynamic";
import React from "react";
// import CreateProductProvider from "../../../features/CreateProduct/context/CreateProductProvider";

const CreateProduct = dynamic(
  () => {
    return import("../../../features/CreateProduct/CreateProduct");
  },
  { ssr: false }
);

const CreateProductProvider = dynamic(
  () => {
    return import(
      "../../../features/CreateProduct/context/CreateProductProvider"
    );
  },
  { ssr: false }
);

const CreateProductPage = () => {
  return (
    <CreateProductProvider>
      <CreateProduct />
    </CreateProductProvider>
  );
};

export default CreateProductPage;
