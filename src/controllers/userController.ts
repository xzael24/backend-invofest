import { Request, Response } from "express";
import { User, RegisterRequest, LoginRequest } from "../types/user";

let users: User[] = [];
let currentId = 1;

export const register = (req: Request, res: Response) => {
    const { name, email, password, bio, event }: RegisterRequest = req.body;

    // Validasi input
    if (!name || !email || !password || !bio || !event) {
        return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Format email tidak valid" });
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

    // Validasi bio minimal 20 karakter
    if (bio.length < 20) {
        return res.status(400).json({ message: "Bio minimal 20 karakter" });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(409).json({ message: "Email sudah terdaftar" });
    }

    // Buat user baru
    const newUser: User = {
        id: currentId++,
        name,
        email,
        password, // Dalam production, password harus di-hash
        bio,
        event,
        createdAt: new Date(),
    };

    users.push(newUser);

    // Kirim response tanpa password
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
        message: "Registrasi berhasil",
        user: userWithoutPassword,
    });
};

export const login = (req: Request, res: Response) => {
    const { email, password }: LoginRequest = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({ message: "Email dan password wajib diisi" });
    }

    // Cari user berdasarkan email
    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(401).json({ message: "Email atau password salah" });
    }

    // Validasi password
    if (user.password !== password) {
        return res.status(401).json({ message: "Email atau password salah" });
    }

    // Kirim response tanpa password
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({
        message: "Login berhasil",
        user: userWithoutPassword,
        token: `dummy-token-${user.id}`, // Dalam production, gunakan JWT
    });
};

export const getUsers = (req: Request, res: Response) => {
    // Kirim semua user tanpa password
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    res.json(usersWithoutPassword);
};

export const getUserById = (req: Request, res: Response) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === parseInt(id as string));

    if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Kirim user tanpa password
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
};

export const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const userIndex = users.findIndex((u) => u.id === parseInt(id as string));

    if (userIndex === -1) {
        return res.status(404).json({ message: "User tidak ditemukan" });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
};
