import express from "express";
import {
    getPembicaras,
    createPembicara,
    getPembicaraById,
    updatePembicara,
    deletePembicara,
} from "../controllers/pembicaraController";

const router = express.Router();

router.get("/", getPembicaras);
router.post("/", createPembicara);
router.get("/:id", getPembicaraById);
router.put("/:id", updatePembicara);
router.delete("/:id", deletePembicara);

export default router;
