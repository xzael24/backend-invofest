import { Request, Response } from "express";
import { Pembicara } from "../types/pembicara";

let pembicaras: Pembicara[] = [
    {
        id: 1,
        name: "Dr. Ahmad Zainudin",
        title: "AI Research Scientist",
        bio: "Expert in Machine Learning and Artificial Intelligence with 10+ years of experience",
        photo: "/assets/zaim.png",
        expertise: ["Machine Learning", "Deep Learning", "AI Ethics"],
    },
    {
        id: 2,
        name: "Siti Nurhaliza, M.Kom",
        title: "Senior Software Engineer",
        bio: "Full-stack developer specializing in modern web technologies",
        photo: "/assets/lhuqita.png",
        expertise: ["React", "Node.js", "Cloud Computing"],
    },
];

let currentId = 3;

export const getPembicaras = (req: Request, res: Response) => {
    res.json(pembicaras);
};

export const createPembicara = (req: Request, res: Response) => {
    const { name, title, bio, photo, expertise } = req.body;

    if (!name || !title || !bio) {
        return res.status(400).json({ message: "Nama, title, dan bio wajib diisi" });
    }

    const newPembicara: Pembicara = {
        id: currentId++,
        name,
        title,
        bio,
        photo: photo || "",
        expertise: expertise || [],
    };

    pembicaras.push(newPembicara);
    res.status(201).json(newPembicara);
};

export const getPembicaraById = (req: Request, res: Response) => {
    const { id } = req.params;
    const pembicara = pembicaras.find((p) => p.id === parseInt(id as string));

    if (!pembicara) {
        return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    }

    res.json(pembicara);
};

export const updatePembicara = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, title, bio, photo, expertise } = req.body;

    const pembicara = pembicaras.find((p) => p.id === parseInt(id as string));
    if (!pembicara) {
        return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    }

    if (name) pembicara.name = name;
    if (title) pembicara.title = title;
    if (bio) pembicara.bio = bio;
    if (photo) pembicara.photo = photo;
    if (expertise) pembicara.expertise = expertise;

    res.json(pembicara);
};

export const deletePembicara = (req: Request, res: Response) => {
    const { id } = req.params;
    const index = pembicaras.findIndex((p) => p.id === parseInt(id as string));

    if (index === -1) {
        return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    }

    pembicaras.splice(index, 1);
    res.status(204).send();
};
