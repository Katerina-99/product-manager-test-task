import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./App.css";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import CreateProductForm from "./components/CreateProductForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />

        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/create-product" element={<CreateProductForm />} />

        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
