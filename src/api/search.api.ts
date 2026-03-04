import { supabase } from "@/lib/supabase";
import type { OrderFlat } from "@/behavior/orders/types";

const VIEW = "v_orders_flat";

export const searchOrdersByName = async (query: string): Promise<OrderFlat[]> => {
	const { data, error } = await supabase
		.from(VIEW)
		.select("*")
		.ilike("customer_name", `%${query}%`)
		.order("order_number", { ascending: false });
	if (error) throw new Error(`searchOrdersByName failed: ${error.message}`);
	return (data ?? []) as OrderFlat[];
};
