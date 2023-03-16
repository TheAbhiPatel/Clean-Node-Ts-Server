import express from "express";
import cors from "cors";

import { HOST_NAME, MONGO_URL, PORT } from "./config";
import router from "./routes";
import { connectDb } from "./connectDB.ts";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router);

app.get("/", async (req, res) => {
  res.status(200).json({ message: "hey you are on my api" });
});

app.use((req, res, next) => {
  res.status(404).json({ error: true, message: "route not found" });
});

app.listen(PORT, HOST_NAME, () => {
  console.log(`server is running t at : http://${HOST_NAME}:${PORT}`);
  connectDb(MONGO_URL);
});
