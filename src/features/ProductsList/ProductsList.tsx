import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, IconButton, Text, useToast } from "@chakra-ui/react";
import { ProductCard } from "../../molecules";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteProductService } from "../CreateProduct/services/deleteProduct";
import AdminProductTable from "./admin/AdminProductTable";
import ClientProductGrid from "./client/ClientProductGrid";

interface ProductListProps {
  isAdmin?: boolean;
}

const ProductsList: FC<ProductListProps> = ({ isAdmin }) => {
  const toast = useToast();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const handleDeleteProduct = (productId: number) => {
    setDeleteLoading(true);

    deleteProductService(productId)
      .then((deletedProduct) => {
        toast({
          title: `${deletedProduct.title} was deleted`,
          status: "success",
          isClosable: true,
        });
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
          .then(({ data }) => {
            console.log(data, 'data')
            setProducts(data);
          });
      })
      .catch(() => {
        toast({
          title: `Product cannot be deleted`,
          status: "error",
          isClosable: true,
        });
      })
      .finally(() => setDeleteLoading(false));
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(({ data }) => {
        setProducts(data);
      });
  }, []);
  
  if (!products) {
    return (
      <Text>No products :(</Text>
    )
  } else {
    return (
            <>
              {isAdmin ? 
              <AdminProductTable products={products}/> : 
              <ClientProductGrid products={products}/>
              }
            </>
    );
  }
};

export default ProductsList;
