import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import projectsRoutes from "./routes/projects.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/projects", projectsRoutes);

export default app;
