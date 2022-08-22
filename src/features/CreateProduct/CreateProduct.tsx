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
import { Select, SingleValue } from "chakra-react-select";
import axios from "axios";
import { Category } from "../../models/Category";
import SelectItem from "../../models/SelectItem";
import useCreateProduct from "./hooks/useCreateProduct";
import { RepeatIcon } from "@chakra-ui/icons";

const CreateProduct = () => {
  const {
    state: {
      loading,
      productForm: { title, description, price, category, image },
    },
    actions: {
      onChangeFormInput,
      onChangeImage,
      handleCreateProduct,
      resetForm,
    },
  } = useCreateProduct();

  const [categories, setCategories] = useState<SelectItem<number>[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const ref = useRef<any>();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFormInput("title", e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChangeFormInput("description", e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    price.onChange && price.onChange(e);
    onChangeFormInput("price", e.target.value);
  };

  const handleCategoryChange = (newValue: SingleValue<SelectItem<number>>) => {
    onChangeFormInput("category", newValue?.value, newValue?.label);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files && e.target.files[0];
    let reader = new FileReader();
    if (file && file.type.match("image.*")) {
      reader.readAsDataURL(file);
    }
    reader.onload = () => {
      if (file === null) return;
      onChangeImage(file, reader.result as string);
    };
  };

  const handleResetForm = () => {
    resetForm();
    ref.current.value = null;
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleCreateProduct().then(() => handleResetForm());
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
          <Heading>Create a product</Heading>
          <IconButton
            colorScheme="blue"
            aria-label="reset form"
            icon={<RepeatIcon />}
            onClick={handleResetForm}
          />
        </Flex>
        <Grid h="100%" templateColumns="repeat(2, 1fr)">
          <form onSubmit={handleSubmit}>
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
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Description ex: origin, composition, etc"
                  value={description.value}
                  onChange={handleDescriptionChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                  >
                    $
                  </InputLeftElement>
                  <Input
                    width="auto"
                    placeholder="Price"
                    value={price.value}
                    onChange={handlePriceChange}
                    onKeyDown={price.onKeyDown}
                    onClick={price.onClick}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Category</FormLabel>
                {categoriesLoading ? (
                  <Skeleton h="40px" />
                ) : (
                  <Select<SelectItem<number>>
                    placeholder="Select category"
                    value={category}
                    options={categories as any}
                    onChange={handleCategoryChange}
                  />
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <input
                  ref={ref}
                  onChange={handleImageChange}
                  accept=".jpg, .png, .gif, .jpeg"
                  type="file"
                  src={image?.src}
                />
              </FormControl>
            </Flex>
            <Button bg="brand.500" mt={6} type="submit">
              Add product
            </Button>
          </form>
          <Flex justifyContent="center">
            <Box>
              {image && <Image src={image.src} alt="New product image" />}
            </Box>
          </Flex>
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
              <Text>Uploading new product</Text>
            </Center>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProduct;
