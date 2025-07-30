import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/profile", authenticateToken, (req, res) => {
    return res.json({
        message: "Proteced profile route",
        userId: req.userId,
    })
})

export default router;