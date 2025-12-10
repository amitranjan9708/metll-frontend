import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [".", "./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  optimizeDeps: {
    exclude: ["@prisma/adapter-pg", "@prisma/client"],
  },
}));

// Store the server instance to avoid recreating it on every request
let serverInstance: any = null;

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      // Lazy-load the server on first request only using runtime helper
      server.middlewares.use(async (req, res, next) => {
        if (!serverInstance) {
          try {
            // Use runtime helper that imports server at actual runtime
            const { getServer } = await import("./server/runtime");
            serverInstance = await getServer();
          } catch (error) {
            console.error("Error loading server:", error);
            res.statusCode = 500;
            res.end("Internal Server Error");
            return;
          }
        }
        // Use the Express app to handle the request
        serverInstance(req, res, next);
      });
    },
  };
}
