import { supabase } from "@/lib/supabase";
import type { Order, OrderFlat } from "@/behavior/orders/types";

const VIEW = "v_orders_flat";

export const fetchOrders = async (): Promise<OrderFlat[]> => {
	const { data, error } = await supabase
		.from(VIEW)
		.select("*")
		.order("order_number", { ascending: false });
	if (error) throw new Error(`fetchOrders failed: ${error.message}`);
	return (data ?? []) as OrderFlat[];
};

export const fetchOrder = async (id: string): Promise<OrderFlat | null> => {
	const { data, error } = await supabase
		.from(VIEW)
		.select("*")
		.eq("order_id", id)
		.single();
	if (error) throw new Error(`fetchOrder failed: ${error.message}`);
	return (data as OrderFlat | null) ?? null;
};

export const searchOrders = async (query: string): Promise<OrderFlat[]> => {
	const pattern = `%${query}%`;
	const { data, error } = await supabase
		.from(VIEW)
		.select("*")
		.or(`customer_name.ilike.${pattern},customer_phone.ilike.${pattern},school_name.ilike.${pattern},school_city.ilike.${pattern}`)
		.order("order_number", { ascending: false });
	if (error) throw new Error(`searchOrders failed: ${error.message}`);
	return (data ?? []) as OrderFlat[];
};

export const createOrder = async (
	payload: Omit<Order, "id" | "order_number" | "created_at">,
): Promise<Order> => {
	const { data, error } = await supabase
		.from("orders")
		.insert(payload)
		.select()
		.single();

	if (error) throw new Error(`createOrder failed: ${error.message}`);

	return data as Order;
};

export const updateOrder = async (
	id: string,
	payload: Partial<Order>,
): Promise<Order> => {
	const { data, error } = await supabase
		.from("orders")
		.update(payload)
		.eq("id", id)
		.select()
		.single();

	if (error) throw new Error(`updateOrder failed: ${error.message}`);

	return data as Order;
};
