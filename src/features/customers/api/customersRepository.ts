import { supabase } from "@/shared/supabase/client";
import type { Customer } from "../types";

export interface CustomersRepository {
	getCustomers(): Promise<Customer[]>;
	getCustomer(id: number): Promise<Customer | null>;
}

class SupabaseCustomersRepository implements CustomersRepository {
	async getCustomers(): Promise<Customer[]> {
		const { data, error } = await supabase
			.from("customers")
			.select("*")
			.order("full_name");
		if (error) throw new Error(`getCustomers failed: ${error.message}`);
		return (data ?? []) as Customer[];
	}

	async getCustomer(id: number): Promise<Customer | null> {
		const { data, error } = await supabase
			.from("customers")
			.select("*")
			.eq("id", id)
			.maybeSingle();
		if (error) throw new Error(`getCustomer failed: ${error.message}`);
		return (data as Customer | null) ?? null;
	}
}

let cached: CustomersRepository | null = null;

export function getCustomersRepository(): CustomersRepository {
	if (!cached) {
		cached = new SupabaseCustomersRepository();
	}
	return cached;
}
