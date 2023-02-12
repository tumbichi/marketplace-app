import { FormControl, FormHelperText, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import React, { useState } from 'react';


interface InputNumberFormProps {
    label: string;
    name: string;
    register: Function;
    error?: string;
};
function InputNumberForm({ label, name, register, error }: InputNumberFormProps) {
    const format = (val: string) => `$  ` + val
    const parse = (val: string) => val.replace(/^\$/, '')
  
    const [value, setValue] = useState('');
  
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <NumberInput
                onChange={(valueString) => setValue(parse(valueString))}
                value={format(value)}
            >
                <NumberInputField {...register(name)}  />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        {error && <FormHelperText color="red">{error}</FormHelperText>}
    </FormControl>
    )
  }

export default InputNumberForm;