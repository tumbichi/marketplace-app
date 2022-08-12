import dynamic from "next/dynamic";
import React from "react";

const CreateProduct = dynamic(
  () => {
    return import("../../../features/CreateProduct/CreateProduct");
  },
  { ssr: false }
);

const CreateProductPage = () => {
  return <CreateProduct />;
};

export default CreateProductPage;
