import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProject = async (req: Request, res: Response) => {
  const { name } = req.body;
  const userId = req.userId;

  try {
    const newProject = await prisma.project.create({
        data: {
            name,
            ownerId: userId!,
        }
    });
    res.status(201).json(newProject);
  }catch (error) {
    res.status(500).json({message: "Error creating project", error});
  }
};

export const getUserProjects = async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        const projects = await prisma.project.findMany({
            where: {ownerId: userId},
            include: { tasks: true},
        })
        res.status(200).json(projects);
    }catch {
        res.status(500).json({message: "Error retieving projects"});
    }
}
