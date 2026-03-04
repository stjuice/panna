export type OrderFlat = {
	order_id: string;
	order_number: number;
	created_at: string;

	type: "graduation" | "wedding" | "party" | "other";
	status: "new" | "fitting" | "released" | "cancelled";

	description?: string;
	release_date?: string;
	next_visit_date?: string;

	price?: number;
	deposit?: number;
	remaining?: number;

	customer_name: string;
	customer_phone: string;

	school_name?: string;
	school_city?: string;
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
