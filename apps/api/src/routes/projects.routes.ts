import { Router } from "express";
import { auth } from "../middleware/auth";
import { checkOwnership } from "../middleware/project-ownership";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projects.controller";
import todoRoutes from "./todos.routes";

const router = Router();

router.use(auth);

router.get("/", getProjects);
router.post("/", createProject);

router.use(checkOwnership);

router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

router.use("/:projectId/todos", todoRoutes);

export default router;
