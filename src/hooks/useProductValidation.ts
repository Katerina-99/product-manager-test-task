import { useState } from "react";

export type ProductFormValues = {
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  rate: string;
  count: string;
};

export type ProductFormErrors = {
  [K in keyof ProductFormValues]: string;
};

const initialErrors: ProductFormErrors = {
  title: "",
  description: "",
  price: "",
  image: "",
  category: "",
  rate: "",
  count: "",
};

export const useProductValidation = (values: ProductFormValues) => {
  const [errors, setErrors] = useState<ProductFormErrors>(initialErrors);

  const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/i;

  const validate = (): boolean => {
    let valid = true;
    const newErrors = { ...initialErrors };

    if (!values.title.trim()) {
      newErrors.title = "Field Title is required";
      valid = false;
    } else if (values.title.length < 3) {
      newErrors.title = "Field Title must be at least 3 characters";
      valid = false;
    } else {
      newErrors.title = "";
    }

    if (!values.description.trim()) {
      newErrors.description = "Field Description is required";
      valid = false;
    } else if (values.description.length < 50) {
      newErrors.description =
        "Field Description must be at least 50 characters";
      valid = false;
    } else {
      newErrors.description = "";
    }

    if (!values.price || Number(values.price) <= 0) {
      newErrors.price = "Price must be a positive number";
      valid = false;
    } else {
      newErrors.price = "";
    }

    if (!values.image.trim()) {
      newErrors.image = "Field Image URL is required";
      valid = false;
    } else if (!urlRegex.test(values.image)) {
      newErrors.image = "Enter a valid URL";
      valid = false;
    } else {
      newErrors.image = "";
    }

    if (!values.category.trim()) {
      newErrors.category = "Field Category is required";
      valid = false;
    } else {
      newErrors.category = "";
    }

    if ((values.rate && Number(values.rate) < 0) || Number(values.rate) > 5) {
      newErrors.rate = "Field Rate must be between 0 and 5";
      valid = false;
    } else {
      newErrors.rate = "";
    }

    if (values.count && Number(values.count) < 0) {
      newErrors.count = "Field Count cannot be negative";
      valid = false;
    } else {
      newErrors.count = "";
    }

    setErrors(newErrors);
    return valid;
  };

  return { errors, setErrors, validate };
};
