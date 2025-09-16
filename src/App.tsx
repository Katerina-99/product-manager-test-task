import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./App.css";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import CreateProductForm from "./components/CreateProductForm";
import EditProductForm from "./components/EditProductForm";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />

        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/create-product" element={<CreateProductForm />} />
        <Route path="/edit-product/:id" element={<EditProductForm />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
