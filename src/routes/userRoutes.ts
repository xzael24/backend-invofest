import express from "express";
import {
    register,
    login,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    uploadPhoto,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getUsers);
router.put("/profile/photo", authenticate, uploadPhoto);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
