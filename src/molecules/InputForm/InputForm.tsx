import React, { FC, PropsWithChildren, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";

interface InputFormProps {
    label: string;
    name: string;
    register: Function;
    error?: string;
    type?: string;
    extraLeftIcon?: string;
}

function InputForm({ label, name, register, error, type = "text", extraLeftIcon }: InputFormProps) {

    return(
        <FormControl>
        <FormLabel>{label}</FormLabel>
        <InputGroup>
            {extraLeftIcon && (
                 <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
                    {extraLeftIcon}
                </InputLeftElement>
            )}
            <Input 
                placeholder={label} 
                type={type} 
                {...register(name)} 
            />
         </InputGroup>
        {error && <FormHelperText color="red">{error}</FormHelperText>}
    </FormControl>

    )
};

export default InputForm;
