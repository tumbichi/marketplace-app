import React, { useEffect, useState } from "react";
import { useCurrency } from "react-hook-currency";
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
  Select,
  Skeleton,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { createProductService } from "../../services/createProduct";
import { Category } from "../../models/Category";

interface SelectItem<T> {
  value: T;
  label: string;
}

const CreateProduct = () => {
  const toast = useToast();
  const { onClick, onChange, onKeyDown, format, toNumber } = useCurrency({
    style: "decimal",
  });
  const [title, setTitle] = useState({ value: "", error: null });
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>(format("000"));
  const [category, setCategory] = useState<SelectItem<number> | undefined>();
  const [categories, setCategories] = useState<SelectItem<number>[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [image, setImage] = useState<{ file?: any; result?: any }>({
    file: null,
    result: null,
  });
  const [imageKey, setImageKey] = useState("imageKey");
  const [loading, setLoading] = useState(false);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setPrice(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle((prev) => ({ ...prev, value: e.target.value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = categories.find((cat) => {
      return cat.value === Number(e.target.value);
    });
    setCategory(selected);
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files && e.target.files[0];
    let reader = new FileReader();
    if (file && file.type.match("image.*")) {
      reader.readAsDataURL(file);
    }
    reader.onload = () => {
      setImage({ file: file, result: reader.result });
    };
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.value.length < 3) {
      return toast({
        title: "The title must be 3 or more characters long",
        status: "error",
        isClosable: true,
      });
    }

    if (!category) {
      return toast({
        title: "The category is mandatory",
        status: "error",
        isClosable: true,
      });
    }

    if (!image.file || !image.result) {
      return toast({
        title: "The product image is obligatory",
        status: "error",
        isClosable: true,
      });
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image.file);

    createProductService(formData, {
      title: title.value,
      description,
      price: toNumber(price),
      categoryId: category.value,
      storeId: 1,
    })
      .then((data) => {
        toast({
          title: `${data.title} created!`,
          status: "success",
          isClosable: true,
        });
        setTitle({ value: "", error: null });
        setDescription("");
        setPrice(format("000"));
        setCategory({ value: 0, label: "" });
        setImage({ file: undefined, result: undefined });
        setImageKey("");
      })
      .catch((e) => {
        console.log("e :>> ", e);
      })
      .finally(() => setLoading(false));
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
        <Heading>Create a product</Heading>
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
                  value={description}
                  onChange={handleChangeDescription}
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
                    value={price}
                    onChange={handlePriceChange}
                    onKeyDown={onKeyDown}
                    onClick={onClick}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Category</FormLabel>
                {categoriesLoading ? (
                  <Skeleton h="40px" />
                ) : (
                  <Select
                    placeholder="Select category"
                    value={category?.value}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((category) => (
                      <option key={category.label} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </Select>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <input
                  key={imageKey}
                  onChange={handleImageChange}
                  accept=".jpg, .png, .gif, .jpeg, .webp"
                  type="file"
                />
              </FormControl>
            </Flex>
            <Button bg="brand.500" mt={6} type="submit">
              Add product
            </Button>
          </form>
          <Flex justifyContent="center">
            <Box>
              {image.result && (
                <Image src={image.result} alt="New product image" />
              )}
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
