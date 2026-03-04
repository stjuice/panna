import { useQuery } from "@tanstack/react-query";
import { getOrdersRepository } from "../api/ordersRepository";

const repo = getOrdersRepository();

export function useOrders() {
	return useQuery({
		queryKey: ["orders"],
		queryFn: () => repo.getOrders(),
	});
}

export function useOrder(id: number) {
	return useQuery({
		queryKey: ["order", id],
		queryFn: () => repo.getOrder(id),
		enabled: Number.isFinite(id),
	});
}
