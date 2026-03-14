import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "pages/Home";
import OrdersListPage from "pages/OrdersListPage";
import OrdersSearchPage from "pages/OrdersSearchPage";
import OrderDetailsPage from "pages/OrderDetailsPage";

export const AppRouter = () => {
	return (
		<BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/orders" element={<OrdersListPage />} />
				<Route path="/search" element={<OrdersSearchPage />} />
				<Route path="/orders/new" element={<OrderDetailsPage />} />
				<Route path="/orders/:id" element={<OrderDetailsPage />} />
			</Routes>
		</BrowserRouter>
	);
};
