import type { Order, OrderFlat, OrderForm } from "./types";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createCustomer } from "api/customers.api";
import { findOrCreateSchool } from "api/schools.api";
import { deleteOrder, createOrder, saveOrder } from "api/orders.api";

export const useOrderActions = (orderId: string) => {
	const queryClient = useQueryClient();
	const [isSaving, setIsSaving] = useState(false);

	const create = async (form: OrderForm): Promise<Order> => {
		setIsSaving(true);
		try {
			const customer = await createCustomer({
				full_name: form.customer_name,
				phone: form.customer_phone,
			});

			const school =
				form.type === "graduation" && form.school_name?.trim()
					? await findOrCreateSchool(
							form.school_name.trim(),
							form.school_city?.trim() || undefined,
						)
					: null;

			const created = await createOrder({
				customer_id: customer.id,
				school_id: school?.id ?? null,
				type: form.type,
				status: form.status,
				description: form.description || null,
				release_date: form.release_date || null,
				next_visit_date: form.next_visit_date || null,
				price: form.price === "" ? null : form.price,
				deposit: form.deposit === "" ? null : form.deposit,
			});

			queryClient.invalidateQueries({ queryKey: ["orders"] });
			return created;
		} finally {
			setIsSaving(false);
		}
	};

	const update = async (form: OrderForm, order: OrderFlat): Promise<void> => {
		setIsSaving(true);
		try {
			await saveOrder({
				p_order_id: order.order_id,
				p_customer_id: order.customer_id ?? null,
				p_customer_name: form.customer_name.trim(),
				p_customer_phone: form.customer_phone.trim(),
				p_school_name: form.school_name?.trim() || "",
				p_school_city: form.school_city?.trim() || "",
				p_type: form.type,
				p_status: form.status,
				p_description: form.description?.trim() || null,
				p_release_date: form.release_date || null,
				p_next_visit_date: form.next_visit_date || null,
				p_price: form.price === "" ? null : form.price,
				p_deposit: form.deposit === "" ? null : form.deposit,
			});

			queryClient.invalidateQueries({ queryKey: ["order", orderId] });
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		} finally {
			setIsSaving(false);
		}
	};

	const cancel = async (): Promise<void> => {
		await deleteOrder(orderId);
		queryClient.invalidateQueries({ queryKey: ["order", orderId] });
		queryClient.invalidateQueries({ queryKey: ["orders"] });
	};

	return { create, update, cancel, isSaving };
};
