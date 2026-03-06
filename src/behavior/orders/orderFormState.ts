import type { OrderFlat } from "./types";
import type { OrderForm } from "./types";

const defaultForm: OrderForm = {
	customer_name: "",
	customer_phone: "",
	school_city: "",
	school_name: "",
	type: "graduation",
	status: "new",
	description: "",
	price: "",
	deposit: "",
	release_date: "",
	next_visit_date: "",
};

export const orderToForm = (order: OrderFlat): OrderForm => ({
	customer_name: order.customer_name ?? "",
	customer_phone: order.customer_phone ?? "",
	school_city: order.school_city ?? "",
	school_name: order.school_name ?? "",
	type: order.type,
	status: order.status,
	description: order.description ?? "",
	price: order.price ?? "",
	deposit: order.deposit ?? "",
	release_date: order.release_date?.slice(0, 10) ?? "",
	next_visit_date: order.next_visit_date?.slice(0, 10) ?? "",
});

export const getDefaultOrderForm = (): OrderForm => ({ ...defaultForm });
