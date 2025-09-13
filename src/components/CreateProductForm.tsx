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

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !price || !image || !category) {
      setError("All fields are required");
      return;
    }

    const newProduct = {
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
    setError("");

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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              placeholder="Image URL"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Count"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex-col gap-2">
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
