import { useQuery } from "@tanstack/react-query";
import { getOrdersRepository } from "../api/ordersRepository";

const repo = getOrdersRepository();

export function useSearchOrders(query: string) {
	return useQuery({
		queryKey: ["orders-search", query],
		queryFn: () =>
			query.trim() ? repo.searchOrders(query.trim()) : repo.getOrders(),
	});
}
