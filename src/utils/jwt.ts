import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: "7d" });
};
