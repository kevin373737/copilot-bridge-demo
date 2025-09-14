import express from "express";
import cors from "cors";
import { getSQLFromCopilot } from "./services/copilot.js";
import { runQuery } from "./services/db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/query", async (req, res) => {
  try {
    const { prompt } = req.body;
    const sql = await getSQLFromCopilot(prompt);
    const data = await runQuery(sql);
    res.json({ sql, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Bridge server running"));
