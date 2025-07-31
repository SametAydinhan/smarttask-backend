import { PrismaClient, TaskStatus } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createTask = async (req: Request, res: Response) => {
  const { title, description, projectId, assignedTo } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        projectId,
        assignedTo,
      },
    });
    return res.status(201).json(task);
  } catch {
    return res.status(500).json({ message: "Failed to create task." });
  }
};

export const getProjectTasks = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const tasks = await prisma.task.findMany({
        where: {projectId: parseInt(projectId)},
        include: {assignee: true}
    });
    return res.status(200).json(tasks);
  }catch {
    return res.status(500).json({message: "Failed to fetch tasks"});
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
    const {taskId} = req.params;
    const {status} = req.body;

    if(!Object.values(TaskStatus).includes(status)){
        return res.status(400).json({message: "Invalid task status."});
    }
    try{
        const updated = await prisma.task.update({
            where: {id: parseInt(taskId)},
            data: {status}
        });
        return res.status(200).json(updated);
    }catch {
        return res.status(500).json({message: "Failed to update task status"});
    }
}
