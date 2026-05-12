import express from "express";
import cors from "cors";

import eventRoutes from "./routes/eventRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import userRoutes from "./routes/userRoutes";
import pembicaraRoutes from "./routes/pembicaraRoutes";
import seminarRoutes from "./routes/seminarRoutes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pembicaras", pembicaraRoutes);
app.use("/api/seminars", seminarRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "API INVOFEST",
        version: "1.0.0",
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