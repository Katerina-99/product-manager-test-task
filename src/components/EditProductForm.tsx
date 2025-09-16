import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { productAction } from "@/store/productsSlice";
import { useNavigate, useParams } from "react-router-dom";
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
import { useProductValidation } from "@/hooks/useProductValidation";

const EditProductForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const product = useAppSelector((state) =>
    state.products.products.find((p) => p.id === productId)
  );

  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price.toString() || "");
  const [image, setImage] = useState(product?.image || "");
  const [category, setCategory] = useState(product?.category || "");
  const [rate, setRate] = useState(product?.rating?.rate?.toString() || "");
  const [count, setCount] = useState(product?.rating?.count?.toString() || "");

  const { errors, validate } = useProductValidation({
    title,
    description,
    price,
    image,
    category,
    rate,
    count,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    if (!product) {
      return <p className="text-center mt-10">Product not found</p>;
    }

    const updatedProduct: Product = {
      ...product,
      title,
      description,
      price: Number(price),
      image,
      category,
      rating: {
        rate: rate ? Number(rate) : 0,
        count: count ? Number(count) : 0,
      },
    };

    dispatch(productAction.updateProduct(updatedProduct));
    navigate(`/products/${id}`);
  };

  const resetForm = () => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price.toString());
      setImage(product.image);
      setCategory(product.category);
      setRate(product.rating?.rate?.toString() || "");
      setCount(product.rating?.count?.toString() || "");
    }
    navigate(`/products/${product?.id}`);
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full min-w-2xs max-w-lg gap-4 py-6 md:py-8">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Product</CardTitle>
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
          <CardFooter className="flex flex-col justify-between gap-4 md:px-8">
            <Button type="submit" className="w-full text-lg">
              Save
            </Button>
            <Button
              variant="secondary"
              className="w-full text-lg"
              onClick={resetForm}
            >
              Back
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EditProductForm;
