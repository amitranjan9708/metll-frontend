import "dotenv/config";
import express from "express";
import cors from "cors";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Lazy-load routes to avoid importing Prisma at config time
  app.get("/api/demo", async (req, res, next) => {
    try {
      const { handleDemo } = await import("./routes/demo");
      return handleDemo(req, res, next);
    } catch (error) {
      console.error("Failed to load demo route:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Waitlist API route
  app.post("/api/waitlist", async (req, res, next) => {
    try {
      const { handleWaitlist } = await import("./routes/waitlist");
      return handleWaitlist(req, res, next);
    } catch (error) {
      console.error("Failed to load waitlist route:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return app;
}
