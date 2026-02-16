import { defineConfig } from "vite";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
	root: "src",
	build: {
		outDir: "../dist",
		emptyOutDir: true,
		target: "ES2020",
		minify: "esbuild",
		sourcemap: false,
	},
	server: {
		// If we are on mobile, listen on 0.0.0.0, otherwise localhost
		host: host || "0.0.0.0",
		port: 5173,
		strictPort: true,
		hmr: host
			? {
					protocol: "ws",
					host: host,
					port: 5173,
				}
			: undefined,
	},
});
