import { type NewOrder, type Order } from "@/types/orders";

export type OrderUpdates = Partial<Omit<Order, "ID">>;

export class OrderNotFoundError extends Error {
	constructor(id: number) {
		super(`Order ${id} not found`);
		this.name = "OrderNotFoundError";
	}
}

export interface OrdersRepository {
	getOrders(): Promise<Order[]>;
	getOrder(id: number): Promise<Order | null>;
	createOrder(payload: NewOrder): Promise<Order>;
	updateOrder(id: number, updates: OrderUpdates): Promise<Order>;
	deleteOrder(id: number): Promise<void>;
}


