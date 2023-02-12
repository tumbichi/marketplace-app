import { ClickEvent, ChangeEvent, KeyboardEvent } from "react-hook-currency";
import FormInput from "../../../../../models/FormInput";
import SelectItem from "../../../../../models/SelectItem";
import ImageInput from "./ImageInput";

interface PriceInput extends FormInput<string> {
  onChange?: (e: ChangeEvent) => void;
  onClick?: (e: ClickEvent) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
}

interface ProductFormState {
  title: FormInput<string>;
  description: FormInput<string>;
  price: PriceInput;
  category: SelectItem<number> | null;
  image?: ImageInput;
}

interface CreateProductState {
  loading: boolean;
  productForm: ProductFormState;
}

export default CreateProductState;
