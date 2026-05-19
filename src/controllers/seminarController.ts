import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// CREATE Seminar
export const createSeminar = async (req: Request, res: Response) => {
    try {
        const { title, description, date, time, location, speaker, category, maxParticipants } = req.body;

        if (!title || !description || !date || !time || !location || !speaker || !category) {
            return res.status(400).json({ message: "Semua field wajib diisi kecuali maxParticipants" });
        }

        const newSeminar = await prisma.seminar.create({
            data: {
                title,
                description,
                date: new Date(date),
                time,
                location,
                speakerId: parseInt(speaker),
                categoryId: parseInt(category),
                maxParticipants: maxParticipants || 100,
                registeredParticipants: 0,
            },
        });

        res.status(201).json({ message: "Seminar berhasil dibuat", data: newSeminar });
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat seminar", error });
    }
};

// READ All Seminars
export const getSeminars = async (req: Request, res: Response) => {
    try {
        const seminars = await prisma.seminar.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                speaker: true,
                category: true,
            },
        });
        res.json(seminars);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data seminar", error });
    }
};

// READ Single Seminar
export const getSeminarById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const seminar = await prisma.seminar.findUnique({
            where: { id },
            include: {
                speaker: true,
                category: true,
            },
        });

        if (!seminar) {
            return res.status(404).json({ message: "Seminar tidak ditemukan" });
        }

        res.json(seminar);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil detail seminar", error });
    }
};

// UPDATE Seminar
export const updateSeminar = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingSeminar = await prisma.seminar.findUnique({ where: { id } });

        if (!existingSeminar) {
            return res.status(404).json({ message: "Seminar tidak ditemukan" });
        }

        const { title, description, date, time, location, speaker, category, maxParticipants } = req.body;

        const updatedSeminar = await prisma.seminar.update({
            where: { id },
            data: {
                title: title ?? existingSeminar.title,
                description: description ?? existingSeminar.description,
                date: date ? new Date(date) : existingSeminar.date,
                time: time ?? existingSeminar.time,
                location: location ?? existingSeminar.location,
                speakerId: speaker ? parseInt(speaker) : existingSeminar.speakerId,
                categoryId: category ? parseInt(category) : existingSeminar.categoryId,
                maxParticipants: maxParticipants ?? existingSeminar.maxParticipants,
            },
        });

        res.json({ message: "Seminar berhasil diupdate", data: updatedSeminar });
    } catch (error) {
        res.status(500).json({ message: "Gagal update seminar", error });
    }
};

// DELETE Seminar
export const deleteSeminar = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingSeminar = await prisma.seminar.findUnique({ where: { id } });

        if (!existingSeminar) {
            return res.status(404).json({ message: "Seminar tidak ditemukan" });
        }

        await prisma.seminar.delete({ where: { id } });
        res.json({ message: "Seminar berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus seminar", error });
    }
};

// REGISTER to Seminar
export const registerToSeminar = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const seminar = await prisma.seminar.findUnique({ where: { id } });

        if (!seminar) {
            return res.status(404).json({ message: "Seminar tidak ditemukan" });
        }

        if (seminar.registeredParticipants >= seminar.maxParticipants) {
            return res.status(400).json({ message: "Seminar sudah penuh" });
        }

        const updatedSeminar = await prisma.seminar.update({
            where: { id },
            data: {
                registeredParticipants: seminar.registeredParticipants + 1,
            },
        });

        res.json({
            message: "Berhasil mendaftar ke seminar",
            seminar: updatedSeminar,
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal mendaftar ke seminar", error });
    }
};
