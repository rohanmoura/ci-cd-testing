import cors from "cors";
import express from "express";
import { prisma } from "@repo/database";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.json({ service: "api", status: "ok" });
  });

  app.get("/users", async (_request, response, next) => {
    try {
      const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" }
      });
      response.json(users);
    } catch (error) {
      next(error);
    }
  });

  app.post("/users", async (request, response, next) => {
    try {
      const { email, name } = request.body as { email?: unknown; name?: unknown };

      if (typeof email !== "string" || !email.includes("@")) {
        response.status(400).json({ error: "A valid email is required" });
        return;
      }

      const user = await prisma.user.create({
        data: {
          email,
          name: typeof name === "string" && name.trim() ? name.trim() : null
        }
      });
      response.status(201).json(user);
    } catch (error) {
      next(error);
    }
  });

  app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  });

  return app;
}
