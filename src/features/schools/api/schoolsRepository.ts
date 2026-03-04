import { supabase } from "@/shared/supabase/client";
import type { School } from "../types";

export interface SchoolsRepository {
	getSchools(): Promise<School[]>;
}

class SupabaseSchoolsRepository implements SchoolsRepository {
	async getSchools(): Promise<School[]> {
		const { data, error } = await supabase
			.from("schools")
			.select("*")
			.order("name");
		if (error) throw new Error(`getSchools failed: ${error.message}`);
		return (data ?? []) as School[];
	}
}

let cached: SchoolsRepository | null = null;

export function getSchoolsRepository(): SchoolsRepository {
	if (!cached) {
		cached = new SupabaseSchoolsRepository();
	}
	return cached;
}
