import React, { FC, PropsWithChildren, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";

interface DropzoneFormProps {
    label: string;
    name: string;
    register: Function;
    error?: string;
}

function DropzoneForm({ label, name, register, error }: DropzoneFormProps) {

    return(
        <FormControl>
                <FormLabel>{label}</FormLabel>
                <input
                name={name}
                  accept=".jpg, .png, .gif, .jpeg"
                  type="file"
                   {...register(name)} 
                />
        {error && <FormHelperText color="red">{error}</FormHelperText>}
    </FormControl>

    )
};

export default DropzoneForm;
