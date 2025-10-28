// routes/newsRoutes.js
import express from "express";
import { checkNews } from "../controllers/newsController.js";

const router = express.Router();

// POST /api/check-news
router.post("/check-news", checkNews);

export default router;
