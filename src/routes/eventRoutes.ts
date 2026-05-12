import {
    getEvents,
    createEvent,
    deleteEvent,
    getEventById,
    updateEvent,
} from "../controllers/eventController";
import express from "express";


const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
