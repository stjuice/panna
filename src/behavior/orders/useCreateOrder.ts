import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer } from "api/customers.api";
import { createOrder } from "api/orders.api";
import type { OrderForm } from "./types";

export const useCreateOrder = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (form: OrderForm) => {
			const customer = await createCustomer({
				full_name: form.customer_name,
				phone: form.customer_phone,
			});
			return createOrder({
				customer_id: customer.id,
				type: form.type,
				status: form.status,
				description: form.description || null,
				release_date: form.release_date || null,
				next_visit_date: form.next_visit_date || null,
				price: form.price === "" ? null : form.price,
				deposit: form.deposit === "" ? null : form.deposit,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
};
