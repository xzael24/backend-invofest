import { Request, Response } from "express";
import { Seminar } from "../types/seminar";

let seminars: Seminar[] = [];
let currentId = 1;

export const getSeminars = (req: Request, res: Response) => {
    res.json(seminars);
};

export const createSeminar = (req: Request, res: Response) => {
    const { title, description, date, time, location, speaker, category, maxParticipants } = req.body;

    if (!title || !description || !date || !time || !location || !speaker || !category) {
        return res.status(400).json({ message: "Semua field wajib diisi kecuali maxParticipants" });
    }

    const newSeminar: Seminar = {
        id: currentId++,
        title,
        description,
        date: new Date(date),
        time,
        location,
        speaker: parseInt(speaker),
        category: parseInt(category),
        maxParticipants: maxParticipants || 100,
        registeredParticipants: 0,
    };

    seminars.push(newSeminar);
    res.status(201).json(newSeminar);
};

export const getSeminarById = (req: Request, res: Response) => {
    const { id } = req.params;
    const seminar = seminars.find((s) => s.id === parseInt(id as string));

    if (!seminar) {
        return res.status(404).json({ message: "Seminar tidak ditemukan" });
    }

    res.json(seminar);
};

export const updateSeminar = (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, date, time, location, speaker, category, maxParticipants } = req.body;

    const seminar = seminars.find((s) => s.id === parseInt(id as string));
    if (!seminar) {
        return res.status(404).json({ message: "Seminar tidak ditemukan" });
    }

    if (title) seminar.title = title;
    if (description) seminar.description = description;
    if (date) seminar.date = new Date(date);
    if (time) seminar.time = time;
    if (location) seminar.location = location;
    if (speaker) seminar.speaker = parseInt(speaker);
    if (category) seminar.category = parseInt(category);
    if (maxParticipants) seminar.maxParticipants = maxParticipants;

    res.json(seminar);
};

export const deleteSeminar = (req: Request, res: Response) => {
    const { id } = req.params;
    const index = seminars.findIndex((s) => s.id === parseInt(id as string));

    if (index === -1) {
        return res.status(404).json({ message: "Seminar tidak ditemukan" });
    }

    seminars.splice(index, 1);
    res.status(204).send();
};

export const registerToSeminar = (req: Request, res: Response) => {
    const { id } = req.params;
    const seminar = seminars.find((s) => s.id === parseInt(id as string));

    if (!seminar) {
        return res.status(404).json({ message: "Seminar tidak ditemukan" });
    }

    if (seminar.registeredParticipants >= seminar.maxParticipants) {
        return res.status(400).json({ message: "Seminar sudah penuh" });
    }

    seminar.registeredParticipants++;
    res.json({
        message: "Berhasil mendaftar ke seminar",
        seminar,
    });
};
