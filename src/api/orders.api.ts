import { supabase } from "@/lib/supabase";
import type { OrderFlat } from "@/behavior/orders/types";
import type { NewOrder } from "@/behavior/orders/types";

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
		.or(`customer_name.ilike.${pattern},customer_phone.ilike.${pattern},school_name.ilike.${pattern}`)
		.order("order_number", { ascending: false });
	if (error) throw new Error(`searchOrders failed: ${error.message}`);
	return (data ?? []) as OrderFlat[];
};

export const createOrder = async (
	customerName: string,
	customerPhone: string,
	order: Omit<NewOrder, "customer_id">,
): Promise<void> => {
	const { data: customer, error: customerError } = await supabase
		.from("customers")
		.upsert(
			{ full_name: customerName, phone: customerPhone },
			{ onConflict: "phone" },
		)
		.select()
		.single();
	if (customerError || !customer) {
		throw new Error(`Customer upsert failed: ${customerError?.message}`);
	}

	const { error: orderError } = await supabase.from("orders").insert({
		customer_id: customer.id,
		...order,
		status: order.status ?? "new",
	});
	if (orderError) {
		throw new Error(`Order insert failed: ${orderError.message}`);
	}
};
