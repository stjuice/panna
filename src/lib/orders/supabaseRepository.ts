import { supabase } from "@/lib/supabase/client";
import type { OrderFlat } from "@/types/orders";
import type { OrdersRepository } from "./repository";

const VIEW = "v_orders_flat";

export class SupabaseOrdersRepository implements OrdersRepository {
	async getOrders(): Promise<OrderFlat[]> {
		const { data, error } = await supabase
			.from(VIEW)
			.select("*")
			.order("created_at", { ascending: false });
		if (error) {
			throw new Error(`getOrders failed: ${error.message}`);
		}
		return (data ?? []) as OrderFlat[];
	}

	async getOrder(id: number): Promise<OrderFlat | null> {
		const { data, error } = await supabase
			.from(VIEW)
			.select("*")
			.eq("order_id", id)
			.maybeSingle();
		if (error) {
			throw new Error(`getOrder failed: ${error.message}`);
		}
		return (data as OrderFlat | null) ?? null;
	}

	async searchOrders(query: string): Promise<OrderFlat[]> {
		const { data, error } = await supabase.rpc("search_orders", {
			q: query,
		});
		if (error) {
			throw new Error(`searchOrders failed: ${error.message}`);
		}
		return (data ?? []) as OrderFlat[];
	}
}
