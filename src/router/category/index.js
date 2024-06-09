import { Router } from "express";
import categoryController from "../../controller/category/index.js";

const categoryRouter = Router();

categoryRouter.get("/categories", categoryController.getAll);

categoryRouter.get("/category/:id", categoryController.getSingle);

categoryRouter.post("/category", categoryController.post);

export default categoryRouter;