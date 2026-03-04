import { type NewOrder, type Order } from "@/types/orders";

import {
	OrderNotFoundError,
	type OrderUpdates,
	type OrdersRepository,
} from "./repository";

const isBrowser = typeof window !== "undefined";

export class FileOrdersRepository implements OrdersRepository {
	private async readOrders(): Promise<Order[]> {
		if (isBrowser) {
			const res = await fetch("/orders.json");
			if (!res.ok) throw new Error("Failed to load orders");
			return (await res.json()) as Order[];
		}
		const { promises: fs } = await import("fs");
		const path = await import("path");
		const dataFilePath = path.join(process.cwd(), "src", "data", "orders.json");
		const file = await fs.readFile(dataFilePath, "utf-8");
		return JSON.parse(file) as Order[];
	}

	private async writeOrders(orders: Order[]): Promise<void> {
		if (isBrowser) {
			throw new Error(
				"File repository is read-only in browser. Use Supabase provider for mutations.",
			);
		}
		const { promises: fs } = await import("fs");
		const path = await import("path");
		const dataFilePath = path.join(process.cwd(), "src", "data", "orders.json");
		await fs.writeFile(dataFilePath, JSON.stringify(orders, null, "\t"), "utf-8");
	}

	async getOrders(): Promise<Order[]> {
		return this.readOrders();
	}

	async getOrder(id: number): Promise<Order | null> {
		const orders = await this.readOrders();
		return orders.find((order) => order.ID === id) ?? null;
	}

	async createOrder(payload: NewOrder): Promise<Order> {
		const orders = await this.readOrders();
		const nextId =
			orders.length > 0 ? Math.max(...orders.map((o) => o.ID)) + 1 : 1;
		const newOrder: Order = { ID: nextId, ...payload };
		orders.push(newOrder);
		await this.writeOrders(orders);
		return newOrder;
	}

	async updateOrder(id: number, updates: OrderUpdates): Promise<Order> {
		const orders = await this.readOrders();
		const idx = orders.findIndex((order) => order.ID === id);
		if (idx === -1) {
			throw new OrderNotFoundError(id);
		}
		const updated: Order = { ...orders[idx], ...updates, ID: id };
		orders[idx] = updated;
		await this.writeOrders(orders);
		return updated;
	}

	async deleteOrder(id: number): Promise<void> {
		const orders = await this.readOrders();
		const exists = orders.some((order) => order.ID === id);
		if (!exists) {
			throw new OrderNotFoundError(id);
		}
		const remaining = orders.filter((order) => order.ID !== id);
		await this.writeOrders(remaining);
	}
}
