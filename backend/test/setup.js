import express from "express";// ajuste o caminho
import router from "../src/routes/index.js";

const app = express();
app.use(express.json());
app.use("/api", router);

export default app;