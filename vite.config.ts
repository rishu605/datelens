import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import type { ViteDevServer } from "vite";
import type { IncomingMessage, ServerResponse } from "http";

function mockApiPlugin() {
  return {
    name: "mock-api",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/api/table-data", async (
        req: IncomingMessage,
        res: ServerResponse,
        next: (err?: any) => void
      ) => {
        if (req.method === "GET") {
          const { mockTableData } = await import("./src/mock/mockTableData");
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(mockTableData));
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), mockApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});