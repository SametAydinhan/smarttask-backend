import { Router } from "express";
import { authenticateToken } from "../../middlewares/authMiddleware";
import { createTask, getProjectTasks, updateTaskStatus } from "../../controllers/task/taskController";


const router = Router();

router.post("/", authenticateToken, createTask);
router.get("/:projectId", authenticateToken, getProjectTasks);
router.patch("/:taskId/status", authenticateToken, updateTaskStatus);

export default router;