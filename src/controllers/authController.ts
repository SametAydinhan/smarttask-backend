import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {PrismaClient} from "@prisma/client";
import {generateToken} from "../utils/jwt";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;
    try {
        const existingUser = await prisma.user.findUnique({where: {email}});
        if(existingUser) return res.status(400).json({message: "Email already in use"});

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await prisma.user.create({
            data: {name, email, password: hashedPassword},
        });

        const token = generateToken(user.id);
        return res.status(201).json({user, token});
    } catch(error) {
        return res.status(500).json({message: "Something went wrong.", error})
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        const user = await prisma.user.findUnique({where: {email}});
        if(!user)  return res.status(404).json({message: "User not found."});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({message: "Invalid credentials."});

        const token = generateToken(user.id);
        return res.status(200).json({user , token});
    } catch(error) {
        return res.status(500).json({message: "Something went wrong.", error});
    }
}