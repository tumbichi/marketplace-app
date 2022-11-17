import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { Category } from "../../models/Category";
import SelectItem from "../../models/SelectItem";
import useCreateCategory from "./hooks/useCreateCategory";
import { RepeatIcon } from "@chakra-ui/icons";

const CreateCategory = () => {
  const {
    state: { loading, title },
    actions: { onChangeFormInput, handleCreateCategory },
  } = useCreateCategory();

  const [categories, setCategories] = useState<SelectItem<number>[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const ref = useRef<any>();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFormInput("title", e.target.value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateCategory();
  };

  useEffect(() => {
    axios
      .get<Category[]>(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then(({ data }) => {
        const categoriesPar = data.map(({ id, title }) => ({
          value: id,
          label: title,
        }));
        setCategories(categoriesPar);
        setCategoriesLoading(false);
      })
      .catch((e) => e);
  }, []);

  return (
    <>
      <Box h="calc(100vh - 3rem)" p={6}>
        <Flex gap={4} alignItems="center">
          <Heading>Create a new category</Heading>
          <IconButton
            colorScheme="blue"
            aria-label="reset form"
            icon={<RepeatIcon />}
          />
        </Flex>
        <Grid h="100%" templateColumns="repeat(2, 1fr)">
          <form onSubmit={handleSubmit}>
            <Flex gap={8} mt={4} flexDirection="column">
              <FormControl isInvalid={title.length > 0 && title.length < 3}>
                <FormLabel>Title</FormLabel>
                <Input
                  width="auto"
                  placeholder="Title"
                  value={title}
                  onChange={handleTitleChange}
                />
                <FormErrorMessage>
                  The title must be 3 or more characters long.
                </FormErrorMessage>
              </FormControl>
            </Flex>
            <Button bg="brand.500" mt={6} type="submit">
              Create category
            </Button>
          </form>
        </Grid>
      </Box>
      <Modal
        isCentered
        isOpen={loading}
        onClose={() => {}}
        closeOnOverlayClick={false}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />

        <ModalContent>
          <ModalHeader>Uploading...</ModalHeader>
          <ModalBody>
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="brand.500"
                size="xl"
              />
            </Center>
            <Center mt={5}>
              <Text>Creating new category</Text>
            </Center>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCategory;
