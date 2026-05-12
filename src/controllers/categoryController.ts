import { Request, Response } from "express";
import { Category } from "../types/category";

let categories: Category[] = [];

export const getCategories = (req: Request, res: Response) => {
    res.json(categories);
};

export const createCategory = (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newCategory = { id: categories.length + 1, name };
    categories.push(newCategory);
    res.status(201).json(newCategory);
};

export const getCategoryById = (req: Request, res: Response) => {
    const { id } = req.params;
    const category = categories.find((category) => category.id === parseInt(id as string));
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
};

export const updateCategory = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = categories.find((category) => category.id === parseInt(id as string));
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }
    if (name) category.name = name;
    res.json(category);
};

export const deleteCategory = (req: Request, res: Response) => {
    const { id } = req.params;
    const category = categories.find((category) => category.id === parseInt(id as string));
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }
    categories = categories.filter((category) => category.id !== parseInt(id as string));
    res.status(204).send();
};
