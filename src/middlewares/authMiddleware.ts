import { Request, Response, NextFunction } from "express";

// Interface untuk extend Request dengan user
export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}

// Middleware untuk validasi token (simplified version)
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    const token = authHeader.split(" ")[1]; // Format: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Format token tidak valid" });
    }

    // Validasi token sederhana (dalam production gunakan JWT)
    if (!token.startsWith("dummy-token-")) {
        return res.status(401).json({ message: "Token tidak valid" });
    }

    // Extract user ID dari token
    const userId = parseInt(token.replace("dummy-token-", ""));
    if (isNaN(userId)) {
        return res.status(401).json({ message: "Token tidak valid" });
    }

    // Set user di request
    req.user = {
        id: userId,
        email: "", // Dalam production, ambil dari database
    };

    next();
};

// Middleware untuk validasi admin (optional)
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Implementasi sederhana - dalam production cek role dari database
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Contoh: user dengan ID 1 adalah admin
    if (req.user.id !== 1) {
        return res.status(403).json({ message: "Forbidden - Admin only" });
    }

    next();
};
