import { Request, Response } from "express";
import { Event } from "../types/event";

let events: Event[] = [];

export const getEvents = (req: Request, res: Response) => {
    res.json(events);
};

export const createEvent = (req: Request, res: Response) => {
    const { name, category, date, description } = req.body;

    if (!name || !category || !date || !description) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newEvent = { id: events.length + 1, name, category, date, description };
    events.push(newEvent);
    res.status(201).json(newEvent);
};

export const getEventById = (req: Request, res: Response) => {
    const { id } = req.params;
    const event = events.find((event) => event.id === parseInt(id as string));
    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
};

export const updateEvent = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, category, date, description } = req.body;
    const event = events.find((event) => event.id === parseInt(id as string));
    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }
    event.name = name;
    event.category = category;
    event.date = date;
    event.description = description;
    res.json(event);
};

export const deleteEvent = (req: Request, res: Response) => {
    const { id } = req.params;
    const event = events.find((event) => event.id === parseInt(id as string));
    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }
    events = events.filter((event) => event.id !== parseInt(id as string));
    res.status(204).send();
};