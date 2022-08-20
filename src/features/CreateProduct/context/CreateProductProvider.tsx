import CreateProductContext, { ProductKey } from "./CreateProductContext";

import React, {
  FC,
  PropsWithChildren,
  Reducer,
  useCallback,
  useReducer,
} from "react";
import createProductReducer, {
  CreateProductReducer,
  initialState,
} from "../reducer/createProductReducer";
import { useCurrency } from "react-hook-currency";
import { createProductService } from "../services/createProduct";
import { useToast } from "@chakra-ui/react";
import Product from "../../../models/Product";

const CreateProductProvider: FC<PropsWithChildren> = ({ children }) => {
  const toast = useToast();
  const { onClick, onChange, onKeyDown, format, toNumber } = useCurrency({
    style: "decimal",
  });

  const [state, dispatch] = useReducer<CreateProductReducer>(
    createProductReducer,
    {
      ...initialState,
      productForm: {
        ...initialState.productForm,
        price: { value: format("000"), onChange, onClick, onKeyDown },
      },
    }
  );

  const hideLoading = useCallback(() => {
    return dispatch({ type: "HIDE_LOADING_ACTION" });
  }, []);

  const onChangeFormInput = (
    key: ProductKey,
    value?: string | number,
    label?: string
  ) => {
    dispatch({ type: "CHANGE_FORM_INPUT", payload: { key, value, label } });
  };

  const onChangeImage = (file: File, src: string) => {
    dispatch({ type: "CHANGE_IMAGE_INPUT", payload: { file, src } });
  };

  const resetForm = () => {
    dispatch({ type: "CLEAR_FORM" });
  };

  const handleCreateProduct = async (): Promise<Product> => {
    const { productForm } = state;

    if (productForm.title.value.length < 3) {
      return toast({
        title: "The title must be 3 or more characters long",
        status: "error",
        isClosable: true,
      });
    }

    if (!productForm.category) {
      return toast({
        title: "The category is mandatory",
        status: "error",
        isClosable: true,
      });
    }

    if (!productForm.image) {
      return toast({
        title: "The product image is obligatory",
        status: "error",
        isClosable: true,
      });
    }

    const imageFormData = new FormData();
    imageFormData.append("image", productForm.image.file);

    dispatch({ type: "SHOW_LOADING_ACTION" });

    try {
      const productCreated = await createProductService({
        title: productForm.title.value,
        description: productForm.description.value,
        price: toNumber(productForm.price.value),
        image: imageFormData,
        categoryId: productForm.category.value,
        storeId: 1,
      });

      console.log("productCreated == response.data :>> ", productCreated);

      toast({
        title: `${productCreated.title} created!`,
        status: "success",
        isClosable: true,
      });

      return Promise.resolve(productCreated);
    } catch (e) {
      return Promise.reject(e);
    } finally {
      hideLoading();
    }
  };

  return (
    <CreateProductContext.Provider
      value={{
        state,
        actions: {
          hideLoading,
          onChangeFormInput,
          onChangeImage,
          handleCreateProduct,
          resetForm,
        },
      }}
    >
      {children}
    </CreateProductContext.Provider>
  );
};

export default CreateProductProvider;
