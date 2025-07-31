import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import protectedRoutes from "./routes/protected"
import projectRoutes from "./routes/project"
import taskRoutes from "./routes/task"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("SmartTask backend is running ✅");
});
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/projects", projectRoutes)
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
