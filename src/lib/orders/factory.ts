import type { OrdersRepository } from "./repository";
import { SupabaseOrdersRepository } from "./supabaseRepository";

let cachedRepository: OrdersRepository | null = null;

export function getOrdersRepository(): OrdersRepository {
	if (!cachedRepository) {
		cachedRepository = new SupabaseOrdersRepository();
	}
	return cachedRepository;
}
