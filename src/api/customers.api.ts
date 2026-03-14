import { supabase } from "lib/supabase";
import type { Customer } from "behavior/customers/types";

export const fetchCustomers = async (): Promise<Customer[]> => {
	const { data, error } = await supabase
		.from("customers")
		.select("*")
		.order("full_name");
	if (error) throw new Error(`fetchCustomers failed: ${error.message}`);
	return (data ?? []) as Customer[];
};

export const fetchCustomer = async (id: string): Promise<Customer | null> => {
	const { data, error } = await supabase
		.from("customers")
		.select("*")
		.eq("id", id)
		.maybeSingle();
	if (error) throw new Error(`fetchCustomer failed: ${error.message}`);
	return (data as Customer | null) ?? null;
};

export const createCustomer = async (
	payload: Omit<Customer, "id" | "created_at">,
): Promise<Customer> => {
	const { data, error } = await supabase
		.from("customers")
		.insert(payload)
		.select()
		.single();

	if (error) throw new Error(`createCustomer failed: ${error.message}`);

	return data as Customer;
};

export const updateCustomer = async (
	id: string,
	payload: Partial<Pick<Customer, "full_name" | "phone" | "city" | "country">>,
): Promise<Customer> => {
	const { data, error } = await supabase
		.from("customers")
		.update(payload)
		.eq("id", id)
		.select()
		.single();

	if (error) throw new Error(`updateCustomer failed: ${error.message}`);

	return data as Customer;
};
