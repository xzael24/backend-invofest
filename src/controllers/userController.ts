import { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { LoginRequest, RegisterRequest } from "../types/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-change-in-production";

// REGISTER User
export const register = async (req: Request, res: Response) => {
    try {
        const { name, nim, password, bio = "", event } = req.body as RegisterRequest;

        // Validasi input
        if (!name || !nim || !password || !event) {
            return res.status(400).json({ message: "Semua field (kecuali bio) wajib diisi" });
        }

        // Validasi NIM format (hanya angka, minimal 8 digit)
        const nimRegex = /^\d{8,}$/;
        if (!nimRegex.test(nim)) {
            return res.status(400).json({ message: "NIM harus berupa angka minimal 8 digit" });
        }

        // Validasi nama minimal 3 karakter
        if (name.length < 3) {
            return res.status(400).json({ message: "Nama minimal 3 karakter" });
        }

        // Validasi password minimal 8 karakter dan harus berisi huruf dan angka
        if (password.length < 8) {
            return res.status(400).json({ message: "Password minimal 8 karakter" });
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password harus berisi huruf dan angka" });
        }

        // Cek apakah NIM sudah terdaftar
        const existingUser = await prisma.user.findUnique({ where: { nim } });
        if (existingUser) {
            return res.status(409).json({ message: "NIM sudah terdaftar" });
        }

        // Hash password dengan bcrypt sebelum disimpan
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat user baru dengan password yang sudah di-hash
        const newUser = await prisma.user.create({
            data: { name, nim, password: hashedPassword, bio, event },
        });

        // Kirim response tanpa password
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json({
            message: "Registrasi berhasil",
            user: userWithoutPassword,
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal registrasi", error });
    }
};

// LOGIN User — menggunakan NIM dan Password + JWT
export const login = async (req: Request, res: Response) => {
    try {
        const { nim, password } = req.body as LoginRequest;

        // Validasi input
        if (!nim || !password) {
            return res.status(400).json({ message: "NIM dan password wajib diisi" });
        }

        // Cari user berdasarkan NIM
        const user = await prisma.user.findUnique({ where: { nim } });
        if (!user) {
            return res.status(401).json({ message: "NIM atau password salah" });
        }

        // Validasi password dengan bcrypt.compare
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "NIM atau password salah" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, nim: user.nim },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Kirim response tanpa password
        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({
            message: "Login berhasil",
            user: userWithoutPassword,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal login", error });
    }
};

// READ All Users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
        });
        // Kirim semua user tanpa password
        const usersWithoutPassword = users.map(({ password, ...user }) => user);
        res.json(usersWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data user", error });
    }
};

// READ Single User
export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        // Kirim user tanpa password
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil detail user", error });
    }
};

// DELETE User
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingUser = await prisma.user.findUnique({ where: { id } });

        if (!existingUser) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        await prisma.user.delete({ where: { id } });
        res.json({ message: "User berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus user", error });
    }
};
