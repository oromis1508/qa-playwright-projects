import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma";

export async function checkOwnership(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const rawId = req.params.projectId ?? req.params.id;
  const projectId = Number(rawId);

  if (!Number.isFinite(projectId)) {
    return res.status(400).json({ message: "Invalid project id" });
  }

  const project = await prisma.project.findFirst({
    where: { id: projectId, ownerId: req.userId },
    select: { id: true },
  });

  if (!project) {
    return res
      .status(403)
      .json({ message: "Project owned by another user or not found" });
  }
  return next();
}
