import type { OrderFlat, UseOrdersResult } from "./types";
import { useQuery } from "@tanstack/react-query";
import { fetchOrder, fetchOrders } from "api/orders.api";

export function useOrders(id: string): UseOrdersResult<OrderFlat | null>;
export function useOrders(): UseOrdersResult<OrderFlat[]>;
export function useOrders(id?: string): UseOrdersResult<OrderFlat | null | OrderFlat[]> {
	const one = useQuery({
		queryKey: ["order", id],
		queryFn: () => fetchOrder(id!),
		enabled: !!id,
	});

	const all = useQuery({
		queryKey: ["orders"],
		queryFn: fetchOrders,
		enabled: !id,
	});

	const query = id ? one : all;

	return {
		data: query.data,
		isLoading: query.isLoading,
		error: query.error,
	};
}
