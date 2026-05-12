import express from "express";
import {
    getSeminars,
    createSeminar,
    getSeminarById,
    updateSeminar,
    deleteSeminar,
    registerToSeminar,
} from "../controllers/seminarController";

const router = express.Router();

router.get("/", getSeminars);
router.post("/", createSeminar);
router.get("/:id", getSeminarById);
router.put("/:id", updateSeminar);
router.delete("/:id", deleteSeminar);
router.post("/:id/register", registerToSeminar);

export default router;
