import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import CreateOrderPage from "./pages/CreateOrderPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/order/:id" element={<OrderDetailsPage />} />
        <Route path="/create" element={<CreateOrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}
