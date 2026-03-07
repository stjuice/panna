import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import fs from "fs";

export default defineConfig({
	base: "/panna/",
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "Panna Wedding Salon",
				short_name: "Panna",
				start_url: "/panna/",
				display: "standalone",
				background_color: "#ffffff",
				theme_color: "#7794b6",
				orientation: "portrait",
				icons: [
					{
						src: "icons/icon-192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "icons/icon-512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
		// SPA fallback for GitHub Pages: serve app for any path
		{
			name: "copy-404",
			closeBundle() {
				const outDir = path.resolve(__dirname, "dist");
				const index = path.join(outDir, "index.html");
				const fallback = path.join(outDir, "404.html");
				if (fs.existsSync(index)) {
					fs.copyFileSync(index, fallback);
				}
			},
		},
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
