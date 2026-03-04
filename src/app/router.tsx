import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/Home";
import { OrdersListPage, OrdersSearchPage, OrderDetailsPage } from "@/pages/Orders";

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/orders" element={<OrdersListPage />} />
				<Route path="/search" element={<OrdersSearchPage />} />
				<Route path="/order/:id" element={<OrderDetailsPage />} />
			</Routes>
		</BrowserRouter>
	);
};
