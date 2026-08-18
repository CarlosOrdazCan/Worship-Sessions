const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || "can_worship_secret_2026";

app.use(cors());
app.use(express.json());

// Archivos estaticos
app.use("/alabanza", express.static(path.join(__dirname, "alabanza")));
app.use(express.static(path.join(__dirname)));

let db;
async function connectDB() {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db("CAN_Database");
    console.log("MongoDB conectado");
}

function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ error: "No autorizado" });
    try {
        req.user = jwt.verify(auth.slice(7), JWT_SECRET);
        next();
    } catch (e) {
        res.status(401).json({ error: "Token invalido" });
    }
}

// POST /login
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Faltan datos" });
        const user = await db.collection("users").findOne({ username: username.toLowerCase().trim() });
        if (!user || user.password !== password) return res.status(401).json({ error: "Credenciales incorrectas" });
        const token = jwt.sign(
            { id: user._id.toString(), username: user.username, role: user.role, ministry: user.ministry },
            JWT_SECRET,
            { expiresIn: "12h" }
        );
        res.json({ token, user: { username: user.username, name: user.name, role: user.role, ministry: user.ministry, instrument: user.instrument, photo: user.photo || null } });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Error interno" });
    }
});

// GET /songs
app.get("/songs", authMiddleware, async (req, res) => {
    try { res.json(await db.collection("songs").find({}).toArray()); }
    catch (err) { res.status(500).json({ error: "Error al obtener canciones" }); }
});

// GET /songs/:id
app.get("/songs/:id", authMiddleware, async (req, res) => {
    try {
        const song = await db.collection("songs").findOne({ _id: new ObjectId(req.params.id) });
        if (!song) return res.status(404).json({ error: "No encontrada" });
        res.json(song);
    } catch (err) { res.status(500).json({ error: "Error" }); }
});

// POST /songs
app.post("/songs", authMiddleware, async (req, res) => {
    try {
        const result = await db.collection("songs").insertOne({ ...req.body, createdAt: new Date() });
        res.json({ _id: result.insertedId });
    } catch (err) { res.status(500).json({ error: "Error al guardar" }); }
});

// PATCH /songs/:id
app.patch("/songs/:id", authMiddleware, async (req, res) => {
    try {
        await db.collection("songs").updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
        res.json({ ok: true });
    } catch (err) { res.status(500).json({ error: "Error al actualizar" }); }
});

// GET /profile
app.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await db.collection("users").findOne({ username: req.user.username }, { projection: { password: 0 } });
        if (!user) return res.status(404).json({ error: "No encontrado" });
        res.json(user);
    } catch (err) { res.status(500).json({ error: "Error" }); }
});

// POST /profile-update
app.post("/profile-update", authMiddleware, async (req, res) => {
    try {
        await db.collection("users").updateOne({ username: req.user.username }, { $set: req.body });
        res.json({ ok: true });
    } catch (err) { res.status(500).json({ error: "Error" }); }
});

// GET /setlists
app.get("/setlists", authMiddleware, async (req, res) => {
    try { res.json(await db.collection("setlists").find({}).toArray()); }
    catch (err) { res.status(500).json({ error: "Error" }); }
});

// PATCH /setlists/:id/absence
app.patch("/setlists/:id/absence", authMiddleware, async (req, res) => {
    try {
        const key = "absences." + req.user.username;
        const update = {};
        update[key] = req.body;
        await db.collection("setlists").updateOne({ _id: new ObjectId(req.params.id) }, { $set: update });
        res.json({ ok: true });
    } catch (err) { res.status(500).json({ error: "Error" }); }
});

// Fallback SPA
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

connectDB()
    .then(() => app.listen(PORT, () => console.log("Servidor CAN en puerto " + PORT)))
    .catch(err => { console.error("No se pudo conectar a MongoDB:", err); process.exit(1); });
