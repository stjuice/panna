export type Order = {
	ID: number;
	CreatedDate: string; // YYYY-MM-DD
	CustomerName: string;
	CustomerPhoneNumber: string;
	Details: string;
};

export type NewOrder = Omit<Order, "ID">; 