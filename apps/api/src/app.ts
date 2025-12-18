import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import projectsRoutes from "./routes/projects.routes";
import testRoutes from "./routes/test.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/projects", projectsRoutes);

if (process.env.NODE_ENV?.trim() === "test") {
  app.use("/__test__", testRoutes);
}

export default app;
