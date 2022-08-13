import React, { ChangeEvent, MouseEvent, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const CreateProduct = () => {
  const toast = useToast();

  const [title, setTitle] = useState({ value: "", error: null });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle((prev) => ({ ...prev, value: e.target.value }));
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (title.value.length < 3) {
      return toast({
        title: "The title must be 3 or more characters long",
        status: "error",
        isClosable: true,
      });
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        title: title.value,
      })
      .then(({ data }) => {
        toast({
          title: `${data.title} created!`,
          status: "success",
          isClosable: true,
        });
        setTitle({ value: "", error: null });
      });
  };

  return (
    <Box p={6}>
      <Heading>Create category</Heading>
      <Flex gap={8} mt={4} flexDirection="column">
        <FormControl
          isInvalid={title.value.length > 0 && title.value.length < 3}
        >
          <FormLabel>Title</FormLabel>
          <Input
            width="auto"
            placeholder="Title"
            value={title.value}
            onChange={handleTitleChange}
          />
          <FormErrorMessage>
            The title must be 3 or more characters long.
          </FormErrorMessage>
        </FormControl>
      </Flex>
      <Button bg="brand.500" mt={6} onClick={handleSubmit}>
        Add category
      </Button>
    </Box>
  );
};

export default CreateProduct;
