import express from "express";
import {
    register,
    login,
    getUsers,
    getUserById,
    deleteUser,
    uploadPhoto,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import multer from "multer";
import path from "path";

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const userId = (req as any).user?.id || "unknown";
        cb(null, `avatar-${userId}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Hanya diperbolehkan mengupload file gambar (.jpeg, .jpg, .png, .webp)"));
    }
});

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getUsers);
router.put("/profile/photo", authenticate, upload.single("photo"), uploadPhoto);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

export default router;
