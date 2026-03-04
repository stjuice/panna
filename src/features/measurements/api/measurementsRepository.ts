import { supabase } from "@/shared/supabase/client";
import type { Measurement } from "../types";

export interface MeasurementsRepository {
	getByOrder(orderId: number): Promise<Measurement | null>;
	getByCustomer(customerId: number): Promise<Measurement[]>;
}

class SupabaseMeasurementsRepository implements MeasurementsRepository {
	async getByOrder(orderId: number): Promise<Measurement | null> {
		const { data, error } = await supabase
			.from("measurements")
			.select("*")
			.eq("order_id", orderId)
			.maybeSingle();
		if (error) throw new Error(`getByOrder failed: ${error.message}`);
		return (data as Measurement | null) ?? null;
	}

	async getByCustomer(customerId: number): Promise<Measurement[]> {
		const { data, error } = await supabase
			.from("measurements")
			.select("*")
			.eq("customer_id", customerId)
			.order("updated_at", { ascending: false });
		if (error) throw new Error(`getByCustomer failed: ${error.message}`);
		return (data ?? []) as Measurement[];
	}
}

let cached: MeasurementsRepository | null = null;

export function getMeasurementsRepository(): MeasurementsRepository {
	if (!cached) {
		cached = new SupabaseMeasurementsRepository();
	}
	return cached;
}
