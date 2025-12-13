import { Request, Response } from "express";
import { prisma } from "../db/prisma";

export async function getProjects(req: Request, res: Response) {
  const projects = await prisma.project.findMany({
    where: { ownerId: req.userId },
  });
  res.json(projects);
}

export async function createProject(req: Request, res: Response) {
  const project = await prisma.project.create({
    data: {
      name: req.body.name,
      ownerId: req.userId!,
    },
  });
  res.status(201).json(project);
}

export async function updateProject(req: Request, res: Response) {
  const project = await prisma.project.update({
    where: { id: Number(req.params.id) },
    data: { name: req.body.name },
  });
  res.json(project);
}

export async function deleteProject(req: Request, res: Response) {
  await prisma.project.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
}
