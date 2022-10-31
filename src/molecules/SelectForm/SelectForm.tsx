import React from "react";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { FormErrorMessage, FormLabel, FormControl, FormHelperText } from "@chakra-ui/react";
import { Select, Props as SelectProps, GroupBase } from "chakra-react-select";

interface ControlledSelecProps {
    name: string;
    label: string;
    options: object[];
    error?: string;
};

function ControlledSelect({
  name,
  label,
  options,
  /* control, */
  error,
  ...selectProps
}: ControlledSelecProps) {

  return (
    <FormControl id={name}>
      <FormLabel>{label}</FormLabel>
      <Select
        options={options}
        {...selectProps}
      />
      {error && <FormHelperText color="red">{error}</FormHelperText>}
    </FormControl>
  );
}

export default ControlledSelect;