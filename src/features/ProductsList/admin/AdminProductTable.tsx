import React, { FC } from "react";
import {
  Table,
  Thead,
  Tbody,
  Image,
  Tr,
  Th,
  TableCaption,
  TableContainer,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Product from "../../../models/Product";

interface AdminProductTableProps {
  products: Product[];
}

const AdminProductTable: FC<AdminProductTableProps> = ({ products }) => {
  return (
    <Flex align="center" justify="center" overflowX="auto">
      <TableContainer>
        <Table variant="simple" size="md">
          <TableCaption>Products list</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Price</Th>
              <Th>Image</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map(({ id, title, price, description, imageUrl }) => (
              <Tr key={`${id}${title}`}>
                <Th>{title}</Th>
                <Th>{description}</Th>
                <Th>{price}</Th>
                <Th>
                  <Image
                    src={imageUrl}
                    borderRadius="full"
                    boxSize="50px"
                    objectFit="contain"
                    alt={`${title}-image`}
                  />
                </Th>
                <Th>
                  <IconButton
                    colorScheme="red"
                    variant="solid"
                    aria-label="delete icons"
                    icon={<DeleteIcon />}
                  />
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default AdminProductTable;
