import {
    getEvents,
    createEvent,
    deleteEvent,
    getEventById,
    updateEvent,
} from "../controllers/eventController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

// GET routes — publik (tanpa auth)
router.get("/", getEvents);
router.get("/:id", getEventById);

// POST, PUT, DELETE — dilindungi auth middleware
router.post("/", authenticate, createEvent);
router.put("/:id", authenticate, updateEvent);
router.delete("/:id", authenticate, deleteEvent);

export default router;
