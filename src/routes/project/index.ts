import { Router } from "express";
import { authenticateToken } from "../../middlewares/authMiddleware";
import { createProject, getUserProjects } from "../../controllers/project/projectController";


const router = Router();

router.post("/", authenticateToken, createProject);
router.get("/", authenticateToken, getUserProjects);

export default router;
