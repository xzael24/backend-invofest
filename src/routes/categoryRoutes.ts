import { authenticate } from "../middlewares/authMiddleware.js";
import {
    getCategories,
    createCategory,
    deleteCategory,
    getCategoryById,
    updateCategory,
} from "../controllers/categoryController.js";
import express from "express";

const router = express.Router();

// GET routes — publik (tanpa auth)
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// POST, PUT, DELETE — dilindungi auth middleware
router.post("/", authenticate, createCategory);
router.put("/:id", authenticate, updateCategory);
router.delete("/:id", authenticate, deleteCategory);

export default router;
