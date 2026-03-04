import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/api/orders.api";
import type { NewOrder } from "./types";

type CreateOrderArgs = {
	customerName: string;
	customerPhone: string;
	order: Omit<NewOrder, "customer_id">;
};

export const useCreateOrder = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ customerName, customerPhone, order }: CreateOrderArgs) =>
			createOrder(customerName, customerPhone, order),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
};
