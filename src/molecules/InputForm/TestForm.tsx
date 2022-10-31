import React from 'react';
import { useController, useFormContext, useForm } from 'react-hook-form';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Button,
} from "@chakra-ui/react";
import { Grid, GridItem } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputForm from './InputForm';
import TextAreaForm from '../TextAreaForm/TextAreaForm';
import InputNumberForm from '../InputNumberForm/InputNumberForm';
import ControlledSelect from '../SelectForm/SelectForm';
import DropzoneForm from '../Dropzone/DropzoneForm';

interface LoginForm {
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
};

const mock = [
    { value: '1', label: 'Category 1' },
    { value: '2', label: 'Category 2' },
    { value: '3', label: 'Category 3' },
];

const TestForm = () => {
    const initialValue = {
        title: '',
        description: '',
        price: '',
        category: ''
    };

    const schema = yup.object().shape({
        title: yup.string().required(),
        description: yup.string().required(),
        price: yup.string().required(),
        image: yup.string().required(),
        /* category: yup
        .array()
        .required("You must select reasons for signing up")
        .of(
          yup.object().shape({
            { value: '1', label: 'Category 1' },
            { value: '2', label: 'Category 2' },
            { value: '3', label: 'Category 3' },
          })
        ), */
      }).required();

      const { 
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        mode: 'onTouched',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(schema),
        defaultValues: initialValue,
      });


      const onSubmit = (values:object) => {
        console.log(values);
      };
      const onError = (error:object) => {
        console.log(error);
      };

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <InputForm
                label="Title"
                name="title"
                error={errors["title"]?.message}
                register={register}
            />
            <TextAreaForm 
              label='Description'
              placeholder='Description'
              name='description'
              error={errors["description"]?.message}
              register={register}
            />

            <InputNumberForm 
              label='Price'
              name='price'
              error={errors["price"]?.message}
              register={register}
            />
            <ControlledSelect 
            label='Category'
            name='category'
            options={mock}
            error={errors["category"]?.message}
            />
            <DropzoneForm 
              label='Image'
              name='image'
              error={errors["image"]?.message}
              register={register}
            />
            
            <Button type="submit" colorScheme='blue'>Button</Button>
        </form>
    );
};

export default TestForm;
