import { Request, Response } from "express";
import { prisma } from "../db/prisma";

export async function getTodos(req: Request, res: Response) {
  const todos = await prisma.todo.findMany({
    where: { projectId: Number(req.params.projectId) },
  });
  res.json(todos);
}

export async function createTodo(req: Request, res: Response) {
  const todo = await prisma.todo.create({
    data: {
      title: req.body.title,
      projectId: Number(req.params.projectId),
    },
  });
  res.status(201).json(todo);
}

export async function updateTodo(req: Request, res: Response) {
  const todoId = Number(req.params.id);
  const projectId = Number(req.params.projectId);

  const existing = await prisma.todo.findFirst({
    where: { id: todoId, projectId },
  });

  if (!existing) {
    return res.status(404).json({ message: "Todo not found in this project" });
  }

  const updated = await prisma.todo.update({
    where: { id: todoId },
    data: {
      title: req.body.title,
      completed: req.body.completed,
    },
  });

  return res.json(updated);
}

export async function deleteTodo(req: Request, res: Response) {
  const todoId = Number(req.params.id);
  const projectId = Number(req.params.projectId);

  const result = await prisma.todo.deleteMany({
    where: { id: todoId, projectId },
  });

  if (result.count === 0) {
    return res.status(404).json({ message: "Todo not found in this project" });
  }
  return res.status(204).end();
}
