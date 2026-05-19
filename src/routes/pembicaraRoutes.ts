import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
    getPembicaras,
    createPembicara,
    getPembicaraById,
    updatePembicara,
    deletePembicara,
} from "../controllers/pembicaraController.js";

const router = express.Router();

// GET routes — publik (tanpa auth)
router.get("/", getPembicaras);
router.get("/:id", getPembicaraById);

// POST, PUT, DELETE — dilindungi auth middleware
router.post("/", authenticate, createPembicara);
router.put("/:id", authenticate, updatePembicara);
router.delete("/:id", authenticate, deletePembicara);

export default router;
