export type OrderFlat = {
	order_id: number;
	created_at: string;
	type: string;
	status: string;
	description: string | null;
	release_date: string | null;
	next_visit_date: string | null;
	price: number | null;
	deposit: number | null;
	remaining: number | null;
	customer_name: string;
	customer_phone: string | null;
	school_name: string | null;
	school_city: string | null;
};

export type NewOrder = {
	customer_id: number;
	school_id?: number | null;
	type: string;
	status: string;
	description?: string;
	release_date?: string | null;
	next_visit_date?: string | null;
	price?: number | null;
	deposit?: number | null;
};

export type OrderUpdates = Partial<Omit<NewOrder, "customer_id">>;
