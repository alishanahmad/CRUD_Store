import "dotenv/config";
import express from "express";
import allRoute from "./router/allRoutes.js";
import { connectionDB } from "./db/config.js";
import syncDB from "./db/init.js";
const app = express();
app.use(express.json());
const port=3000;

connectionDB();
syncDB().then(() => console.log("db synced"));
app.use(allRoute);
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});