/**
 * Format an ISO date string (yyyy-mm-dd) as dd.mm.yyyy for display.
 */
export const formatDate = (date?: string | null): string => {
	if (!date) return "—";
	const d = new Date(date);
	const dd = String(d.getDate()).padStart(2, "0");
	const mm = String(d.getMonth() + 1).padStart(2, "0");
	const yyyy = d.getFullYear();
	return `${dd}.${mm}.${yyyy}`;
};

/**
 * Format yyyy-mm-dd for use in a dd/mm/yyyy text input.
 */
export const toDisplayDate = (iso?: string): string => {
	const part = iso?.slice(0, 10);
	if (!part || !part.match(/^\d{4}-\d{2}-\d{2}$/)) return "";
	const [y, m, d] = part.split("-");
	return `${d}/${m}/${y}`;
};

/**
 * Parse dd/mm/yyyy or d/m/yyyy to yyyy-mm-dd. Returns empty string if invalid.
 */
export const parseDisplayDate = (display: string): string => {
	const trimmed = display.trim();
	if (!trimmed) return "";
	const parts = trimmed.split("/").map((p) => p.trim());
	if (parts.length !== 3) return "";
	const [d, m, y] = parts;
	const dd = d.padStart(2, "0");
	const mm = m.padStart(2, "0");
	const yy = y.length === 2 ? `20${y}` : y;
	if (dd.length > 2 || mm.length > 2 || yy.length !== 4) return "";
	const iso = `${yy}-${mm}-${dd}`;
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "";
	return iso;
};
