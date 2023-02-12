import CreateCategoryContext from "./CreateCategoryContext";

import React, { FC, PropsWithChildren, useCallback, useReducer } from "react";
import createCategoryReducer, {
  CreateCategoryReducer,
  initialState,
} from "../reducer/createCategoryReducer";
import { createCategoryService } from "../services/createCategory";
import { useToast } from "@chakra-ui/react";
import { Category } from "../../../../../models/Category";

const CreateCategoryProvider: FC<PropsWithChildren> = ({ children }) => {
  const toast = useToast();
  const [state, dispatch] = useReducer<CreateCategoryReducer>(
    createCategoryReducer,
    initialState
  );

  const hideLoading = useCallback(() => {
    return dispatch({ type: "HIDE_LOADING_ACTION" });
  }, []);

  const onChangeFormInput = (value: string) => {
    dispatch({ type: "CHANGE_FORM_INPUT", payload: value });
  };

  const handleCreateCategory = () => {
    const { title } = state;

    if (title.length < 3) {
      toast({
        title: "The title must be 3 or more characters long",
        status: "error",
        isClosable: true,
      });
    }

    dispatch({ type: "SHOW_LOADING_ACTION" });

    createCategoryService({
      title: title,
    })
      .then((categoryCreated) => {
        toast({
          title: `${categoryCreated.title} created!`,
          status: "success",
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Error inesperado, intente nuevamente mas tarde",
          status: "error",
          isClosable: true,
        });
      })
      .finally(hideLoading);
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
