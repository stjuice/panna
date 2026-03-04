import { useQuery } from "@tanstack/react-query";
import { fetchOrder } from "@/api/orders.api";

export const useOrder = (id: string) => {
	return useQuery({
		queryKey: ["order", id],
		queryFn: () => fetchOrder(id),
		enabled: !!id,
	});
};
