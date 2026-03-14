import type { OrderFlat } from "behavior/orders";
import { supabase } from "lib/supabase";

const VIEW = "v_orders_flat";

export const searchOrdersByQuery = async (query: string): Promise<OrderFlat[]> => {
	const pattern = `%${query}%`;
	const { data, error } = await supabase
		.from(VIEW)
		.select("*")
		.or(`customer_name.ilike.${pattern},customer_phone.ilike.${pattern},school_name.ilike.${pattern}`)
		.order("order_number", { ascending: false });
	if (error) throw new Error(`searchOrders failed: ${error.message}`);
	return (data ?? []) as OrderFlat[];
};
