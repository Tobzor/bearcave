import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    envDir: "./env",
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "src/bearcave/components"),
            "@utils": path.resolve(__dirname, "src/bearcave/utils"),
            "@types": path.resolve(__dirname, "src/bearcave/types"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@css": path.resolve(
                __dirname,
                "src/bearcave/components/core/styles",
            ),
        },
    },
});
