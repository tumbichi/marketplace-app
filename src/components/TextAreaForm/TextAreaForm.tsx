import React, { FC, PropsWithChildren, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Textarea,
} from "@chakra-ui/react";

interface TextAreaFormProps {
    label: string;
    placeholder: string;
    name: string;
    register: Function;
    onChange?: Function;
    error?: string;
}

function TextAreaForm({ label, placeholder, name, register, onChange, error }: TextAreaFormProps) {

    return(
        <FormControl>
        <FormLabel>{label}</FormLabel>
        <Textarea placeholder={placeholder} {...register(name)} onChange={onChange} />
        {error && <FormHelperText color="red">{error}</FormHelperText>}
    </FormControl>

    )
};

export default TextAreaForm;
