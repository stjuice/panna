import { useQuery } from "@tanstack/react-query";
import { fetchOrder } from "@/api/orders.api";

type UseOrderOptions = {
	enabled?: boolean;
};

export const useOrder = (id: string, options?: UseOrderOptions) => {
	return useQuery({
		queryKey: ["order", id],
		queryFn: () => fetchOrder(id),
		enabled: options?.enabled !== false && !!id,
	});
};
