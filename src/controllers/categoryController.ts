import { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import { Category } from "../types/category.js";

// CREATE Category
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body as Category;

        if (!name) {
            return res.status(400).json({ message: "Nama category wajib diisi" });
        }

        const newCategory = await prisma.category.create({
            data: { name },
        });

        res.status(201).json({ message: "Category berhasil dibuat", data: newCategory });
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat category", error });
    }
};

// READ All Categories
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data category", error });
    }
};

// READ Single Category
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const category = await prisma.category.findUnique({ where: { id } });

        if (!category) {
            return res.status(404).json({ message: "Category tidak ditemukan" });
        }

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil detail category", error });
    }
};

// UPDATE Category
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingCategory = await prisma.category.findUnique({ where: { id } });

        if (!existingCategory) {
            return res.status(404).json({ message: "Category tidak ditemukan" });
        }

        const { name } = req.body as Category;

        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name: name ?? existingCategory.name,
            },
        });

        res.json({ message: "Category berhasil diupdate", data: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: "Gagal update category", error });
    }
};

// DELETE Category
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingCategory = await prisma.category.findUnique({ where: { id } });

        if (!existingCategory) {
            return res.status(404).json({ message: "Category tidak ditemukan" });
        }

        await prisma.category.delete({ where: { id } });
        res.json({ message: "Category berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus category", error });
    }
};
