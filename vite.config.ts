import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	return {
		plugins: [react()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		define: {
			"process.env.ORDERS_DATA_PROVIDER": JSON.stringify(
				env.VITE_ORDERS_DATA_PROVIDER ?? "file",
			),
			"process.env.SUPABASE_URL": JSON.stringify(env.VITE_SUPABASE_URL ?? ""),
			"process.env.SUPABASE_ANON_KEY": JSON.stringify(
				env.VITE_SUPABASE_ANON_KEY ?? "",
			),
			"process.env.SUPABASE_SERVICE_ROLE_KEY": JSON.stringify(
				env.VITE_SUPABASE_SERVICE_ROLE_KEY ?? "",
			),
		},
		test: {
			environment: "jsdom",
			globals: true,
		},
	};
});
