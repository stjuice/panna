export type OrderType = "graduation" | "wedding" | "party" | "other";

export type OrderStatus = "new" | "fitting" | "released" | "cancelled";

export type OrderFlat = {
	order_id: string;
	order_number: number;
	created_at: string;

	type: OrderType;
	status: OrderStatus;

	description?: string;
	release_date?: string;
	next_visit_date?: string;

	price?: number;
	deposit?: number;
	remaining?: number;

	customer_id?: string;
	customer_name: string;
	customer_phone: string;

	school_id?: string | null;
	school_name?: string;
	school_city?: string;
};

/** Row from "orders" table (for create/update API). */
export type Order = {
	id: string;
	order_number: number;
	created_at: string;
	customer_id: string;
	school_id?: string | null;
	type: OrderType;
	status: OrderStatus;
	description?: string | null;
	release_date?: string | null;
	next_visit_date?: string | null;
	price?: number | null;
	deposit?: number | null;
};

export type NewOrder = {
	customer_id: string;
	school_id?: string | null;
	type: string;
	status: string;
	description?: string;
	release_date?: string | null;
	next_visit_date?: string | null;
	price?: number | null;
	deposit?: number | null;
};

/** Editable form state for order details page */
export type OrderForm = {
	customer_name: string;
	customer_phone: string;
	school_city: string;
	school_name: string;
	type: OrderType;
	status: OrderStatus;
	description: string;
	price: number | "";
	deposit: number | "";
	release_date: string;
	next_visit_date: string;
};

export type UseOrdersResult<T> = {
	data: T | undefined;
	isLoading: boolean;
	error: Error | null;
};
