import { useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { productAction } from "@/store/productsSlice";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/types/product";

const CreateProductForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [rate, setRate] = useState("");
  const [count, setCount] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    rate: "",
    count: "",
  });

  const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/i;

  const validate = () => {
    let valid = true;

    if (!title.trim()) {
      setErrors((prev) => ({ ...prev, title: "Field Title is required" }));
      valid = false;
    } else if (title.length < 3) {
      setErrors((prev) => ({
        ...prev,
        title: "Field Title must be at least 3 characters",
      }));

      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, title: "" }));
    }

    if (!description.trim()) {
      setErrors((prev) => ({
        ...prev,
        description: "Field Description is required",
      }));

      valid = false;
    } else if (description.length < 30) {
      setErrors((prev) => ({
        ...prev,
        description: "Field Description must be at least 30 characters",
      }));

      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, description: "" }));
    }

    if (!price || Number(price) <= 0) {
      setErrors((prev) => ({
        ...prev,
        price: "Price must be a positive number",
      }));

      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, price: "" }));
    }

    if (!image.trim()) {
      setErrors((prev) => ({
        ...prev,
        image: "Field Image URL is required",
      }));

      valid = false;
    } else if (!urlRegex.test(image)) {
      setErrors((prev) => ({
        ...prev,
        image: "Enter a valid URL",
      }));

      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, image: "" }));
    }

    if (!category.trim()) {
      setErrors((prev) => ({
        ...prev,
        category: "Field Category is required",
      }));

      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, category: "" }));
    }

    if ((rate && Number(rate) < 0) || Number(rate) > 5) {
      setErrors((prev) => ({
        ...prev,
        rate: "Field Rate must be between 0 and 5",
      }));

      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, rate: "" }));
    }

    if (count && Number(count) < 0) {
      setErrors((prev) => ({
        ...prev,
        count: "Field Count cannot be negative",
      }));

      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, count: "" }));
    }

    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      title,
      description,
      price: Number(price),
      image,
      category,
      rating: {
        rate: rate ? Number(rate) : 0,
        count: count ? Number(count) : 0,
      },
      liked: false,
    };

    dispatch(productAction.addProduct(newProduct));

    setTitle("");
    setDescription("");
    setPrice("");
    setImage("");
    setCategory("");
    setRate("");
    setCount("");

    navigate("/products");
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full min-w-2xs max-w-lg gap-4 py-6 md:py-8">
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <CardContent className="flex flex-col gap-4">
            <div>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              {errors.title && (
                <p className="text-(--chart-3) text-left px-3 text-sm">
                  {errors.title}
                </p>
              )}
            </div>
            <div>
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              {errors.description && (
                <p className="text-(--chart-3) text-left pl-[12px] text-sm">
                  {errors.description}
                </p>
              )}
            </div>
            <div>
              <Input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && (
                <p className="text-(--chart-3) text-left pl-[12px] text-sm">
                  {errors.price}
                </p>
              )}
            </div>
            <div>
              <Input
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              {errors.image && (
                <p className="text-(--chart-3) text-left pl-[12px] text-sm">
                  {errors.image}
                </p>
              )}
            </div>
            <div>
              <Input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              {errors.category && (
                <p className="text-(--chart-3) text-left pl-[12px] text-sm">
                  {errors.category}
                </p>
              )}
            </div>
            <div>
              <Input
                type="number"
                placeholder="Rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
              {errors.rate && (
                <p className="text-(--chart-3) text-left pl-[12px] text-sm">
                  {errors.rate}
                </p>
              )}
            </div>
            <div>
              <Input
                type="number"
                placeholder="Count"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
              {errors.count && (
                <p className="text-(--chart-3) text-left pl-[12px] text-sm">
                  {errors.count}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full">
              Create
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateProductForm;
