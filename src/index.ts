import express from "express";
import cors from "cors";

import eventRoutes from "./routes/eventRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import pembicaraRoutes from "./routes/pembicaraRoutes.js";
import seminarRoutes from "./routes/seminarRoutes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: "4.5mb" }));
app.use(express.urlencoded({ limit: "4.5mb", extended: true }));


app.use("/api/events", eventRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pembicaras", pembicaraRoutes);
app.use("/api/seminars", seminarRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "API INVOFEST",
        version: "2.0.0 — Prisma + Supabase PostgreSQL",
        endpoints: {
            users: "/api/users",
            events: "/api/events",
            categories: "/api/categories",
            pembicaras: "/api/pembicaras",
            seminars: "/api/seminars",
        },
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});