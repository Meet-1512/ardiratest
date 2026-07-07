import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  envPrefix: ["VITE_", "RECAPTCHA_"],
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  build: {
    target: "es2020",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false,
        passes: 2,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
    cssMinify: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("@radix-ui")) {
              return "radix-ui";
            }
            if (id.includes("react-router")) {
              return "react-router";
            }
            if (id.includes("@tanstack")) {
              return "tanstack";
            }
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
});
