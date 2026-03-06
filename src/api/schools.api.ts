import { supabase } from "@/lib/supabase";
import type { School } from "@/behavior/schools/types";

/**
 * Find school by name + city, or create one if not found.
 * Returns null when name is empty (no school to link).
 */
export const findOrCreateSchool = async (
	name: string,
	city?: string,
): Promise<School | null> => {
	if (!name?.trim()) return null;

	const { data: existing } = await supabase
		.from("schools")
		.select("*")
		.eq("name", name.trim())
		.eq("city", city?.trim() ?? "")
		.maybeSingle();

	if (existing) return existing as School;

	const { data: created, error } = await supabase
		.from("schools")
		.insert({
			name: name.trim(),
			city: city?.trim() ?? null,
		})
		.select()
		.single();

	if (error) throw new Error(`findOrCreateSchool failed: ${error.message}`);

	return created as School;
};
