import type { Order, OrderFlat } from "behavior/orders";
import { supabase } from "lib/supabase";

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

/** Last N orders by most recently modified. Uses updated_at if view has it, else created_at. */
export const fetchLastModifiedOrders = async (limit: number): Promise<OrderFlat[]> => {
	const { data, error } = await supabase
		.from(VIEW)
		.select("*")
		.order("updated_at", { ascending: false })
		.limit(limit);
	if (error) {
		// Fallback when view has no updated_at (e.g. use created_at in view)
		const fallback = await supabase
			.from(VIEW)
			.select("*")
			.order("created_at", { ascending: false })
			.limit(limit);
		if (fallback.error) throw new Error(`fetchLastModifiedOrders failed: ${fallback.error.message}`);
		return (fallback.data ?? []) as OrderFlat[];
	}
	return (data ?? []) as OrderFlat[];
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

export const deleteOrder = async (id: string): Promise<void> => {
	const { error } = await supabase
		.from("orders")
		.delete()
		.eq("id", id);

	if (error) throw new Error(`deleteOrder failed: ${error.message}`);
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

/** Payload for save_order RPC (updates customer, school, order in one transaction). */
export type SaveOrderPayload = {
	p_order_id: string;
	p_customer_id: string | null;
	p_customer_name: string;
	p_customer_phone: string;
	p_school_name: string;
	p_school_city: string;
	p_type: string;
	p_status: string;
	p_description: string | null;
	p_release_date: string | null;
	p_next_visit_date: string | null;
	p_price: number | null;
	p_deposit: number | null;
};

export const saveOrder = async (payload: SaveOrderPayload): Promise<void> => {
	const { error } = await supabase.rpc("save_order", payload);

	if (error) throw new Error(`saveOrder failed: ${error.message}`);
};
