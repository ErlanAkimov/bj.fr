import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

//@ts-ignore
import nodePolyfills from "vite-plugin-node-stdlib-browser";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react(), nodePolyfills()],
        define: {
            "import.meta.env.VITE_DOMAIN":
                env.NODE_ENV === "development"
                    ? JSON.stringify(env.VITE_DEV_DOMAIN)
                    : JSON.stringify(env.VITE_PROD_DOMAIN),
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes("node_modules")) {
                            return id.toString().split("node_modules/")[1].split("/")[0].toString();
                        }
                    },

                    // Хеширование файлов
                    entryFileNames: "assets/[name].[hash].js",
                    chunkFileNames: "assets/[name].[hash].js",
                    assetFileNames: "assets/[name].[hash].[ext]",
                },
            },
        },
        server: {
            proxy: {
                "/api": {
                    target: "http://localhost:9000",
                    changeOrigin: true,
                    secure: true,
                },
                "/wss": {
                    target: "ws://192.168.0.105:9001",
                    changeOrigin: true,
                    secure: true,
                },
            },
            host: true,
            https: false,
            port: 5173,
        },
    };
});
