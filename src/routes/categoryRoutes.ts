import {
    getCategories,
    createCategory,
    deleteCategory,
    getCategoryById,
    updateCategory,
} from "../controllers/categoryController";
import express from "express";

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
