import React, { FC, PropsWithChildren, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
} from "@chakra-ui/react";

interface InputFormProps {
    label: string;
    name: string;
    register: Function;
    error?: string;
    type?: string;
}

function InputForm({ label, name, register, error, type = "text" }: InputFormProps) {

    return(
        <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input placeholder={label} type={type} {...register(name)} />
        {error && <FormHelperText color="red">{error}</FormHelperText>}
    </FormControl>

    )
};

export default InputForm;
