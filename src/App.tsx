import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./App.css";
import ProductList from "./components/ProductList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />

        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<div>Product details</div>} />
        <Route path="/create-product" element={<div>Create product</div>} />

        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
