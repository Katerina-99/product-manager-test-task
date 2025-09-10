// import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />

        <Route path="/products" element={<div>Products page</div>} />
        <Route path="/products/:id" element={<div>Product details</div>} />
        <Route path="/create-product" element={<div>Create product</div>} />

        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
