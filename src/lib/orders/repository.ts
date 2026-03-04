import type { OrderFlat } from "@/types/orders";

export class OrderNotFoundError extends Error {
	constructor(id: number) {
		super(`Order ${id} not found`);
		this.name = "OrderNotFoundError";
	}
}

export interface OrdersRepository {
	getOrders(): Promise<OrderFlat[]>;
	getOrder(id: number): Promise<OrderFlat | null>;
	searchOrders(query: string): Promise<OrderFlat[]>;
}
