import {
	createClient,
	type PostgrestError,
	type SupabaseClient,
} from "@supabase/supabase-js";

import { type NewOrder, type Order } from "@/types/orders";

import { type OrderUpdates, type OrdersRepository } from "./repository";

type SupabaseCustomerRow = {
	firstname: string | null;
	lastname: string | null;
	phonenumber: string | null;
};

type SupabaseOrderRow = {
	orderid: number;
	datecreated: string | null;
	description: string | null;
	customers: SupabaseCustomerRow | null;
};

const ROW_NOT_FOUND_CODE = "PGRST116";
const DEFAULT_TABLE = "orders";
const ORDER_SELECT =
	"orderid,datecreated,description,customers:customers!orders_customerid_fkey(firstname,lastname,phonenumber)";

function requireEnv(name: string): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}
	return value;
}

export class SupabaseOrdersRepository implements OrdersRepository {
	private readonly client: SupabaseClient;
	private readonly table: string;

	constructor() {
		const url = requireEnv("SUPABASE_URL");
		const key =
			process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;
		if (!key) {
			throw new Error(
				"Missing Supabase key. Provide SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY.",
			);
		}
		this.client = createClient(url, key, {
			auth: {
				persistSession: false,
				autoRefreshToken: false,
			},
		});
		this.table = process.env.SUPABASE_ORDERS_TABLE ?? DEFAULT_TABLE;
	}

	private isRowNotFound(error: PostgrestError | null, data: unknown): boolean {
		return (
			(!!error && error.code === ROW_NOT_FOUND_CODE) ||
			(!error && (data === null || data === undefined))
		);
	}

	private mapOrder(row: SupabaseOrderRow): Order {
		const customer = row.customers;
		const first = customer?.firstname?.trim() ?? "";
		const last = customer?.lastname?.trim() ?? "";
		const customerName = [first, last].filter(Boolean).join(" ").trim() || "N/A";
		const phone = customer?.phonenumber?.trim() ?? "";
		const createdDate = row.datecreated?.split("T")[0] ?? "";

		return {
			ID: row.orderid,
			CreatedDate: createdDate,
			CustomerName: customerName,
			CustomerPhoneNumber: phone,
			Details: row.description ?? "",
		};
	}

	async getOrders(): Promise<Order[]> {
		const { data, error } = await this.client
			.from(this.table)
			.select(ORDER_SELECT)
			.order("orderid", { ascending: true });
		if (error) {
			throw new Error(`Supabase getOrders failed: ${error.message}`);
		}
		return (data as SupabaseOrderRow[]).map(row => this.mapOrder(row));
	}

	async getOrder(id: number): Promise<Order | null> {
		const { data, error } = await this.client
			.from(this.table)
			.select(ORDER_SELECT)
			.eq("orderid", id)
			.maybeSingle();
		if (error) {
			throw new Error(`Supabase getOrder failed: ${error.message}`);
		}
		if (!data) {
			return null;
		}
		return this.mapOrder(data as SupabaseOrderRow);
	}

	async createOrder(_payload: NewOrder): Promise<Order> {
		throw new Error(
			"Creating orders via Supabase is not supported with the current relational schema.",
		);
	}

	async updateOrder(_id: number, _updates: OrderUpdates): Promise<Order> {
		throw new Error(
			"Updating orders via Supabase is not supported with the current relational schema.",
		);
	}

	async deleteOrder(_id: number): Promise<void> {
		throw new Error(
			"Deleting orders via Supabase is not supported with the current relational schema.",
		);
	}
}


