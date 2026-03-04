import { FileOrdersRepository } from "./fileRepository";
import { OrdersRepository } from "./repository";
import { SupabaseOrdersRepository } from "./supabaseRepository";

export type OrdersDataProvider = "file" | "supabase";

const providerEnv = (process.env.ORDERS_DATA_PROVIDER ?? "file").toLowerCase();

let cachedRepository: OrdersRepository | null = null;

function resolveProvider(): OrdersDataProvider {
	if (providerEnv === "file" || providerEnv === "supabase") {
		return providerEnv;
	}

	console.warn(
		`Unknown ORDERS_DATA_PROVIDER="${providerEnv}", defaulting to "file". ` +
			`Valid options are "file" or "supabase".`,
	);
	return "file";
}

function createRepository(): OrdersRepository {
	const provider = resolveProvider();
	if (provider === "supabase") {
		return new SupabaseOrdersRepository();
	}
	return new FileOrdersRepository();
}

export function getOrdersRepository(): OrdersRepository {
	if (!cachedRepository) {
		cachedRepository = createRepository();
	}
	return cachedRepository;
}


