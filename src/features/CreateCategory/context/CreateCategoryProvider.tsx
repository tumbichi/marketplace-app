import CreateCategoryContext from "./CreateCategoryContext";

import React, {
  FC,
  PropsWithChildren,
  Reducer,
  useCallback,
  useReducer,
} from "react";
import createCategoryReducer, {
  CreateCategoryReducer,
  initialState,
} from "../reducer/createCategoryReducer";
import { createCategoryService } from "../services/createCategory";
import { useToast } from "@chakra-ui/react";
import { Category } from "../../../models/Category";

const CreateCategoryProvider: FC<PropsWithChildren> = ({ children }) => {
  const toast = useToast();
  const [state, dispatch] = useReducer<CreateCategoryReducer>(createCategoryReducer, initialState);

  const hideLoading = useCallback(() => {
    return dispatch({ type: "HIDE_LOADING_ACTION" });
  }, []);

  const onChangeFormInput = (
    value: string,
  ) => {
    dispatch({ type: "CHANGE_FORM_INPUT", payload: value });
  };

  const handleCreateCategory = async (): Promise<Category> => {
    const { title } = state;

    if (title.length < 3) {
      return Promise.reject(() =>
        toast({
          title: "The title must be 3 or more characters long",
          status: "error",
          isClosable: true,
        })
      );
    }

    dispatch({ type: "SHOW_LOADING_ACTION" });

    try {
      const categoryCreated = await createCategoryService({
        title: title
      });

      toast({
        title: `${categoryCreated.title} created!`,
        status: "success",
        isClosable: true,
      });

      return Promise.resolve(categoryCreated);
    } catch (e) {
      return Promise.reject(e);
    } finally {
      hideLoading();
    }
  };

  return (
    <CreateCategoryContext.Provider
      value={{
        state,
        actions: {
          hideLoading,
          onChangeFormInput,
          handleCreateCategory,
        },
      }}
    >
      {children}
    </CreateCategoryContext.Provider>
  );
};

export default CreateCategoryProvider;
