import { Router } from "express";
import categoryController from "../../controller/category/index.js";

const categoryRouter = Router();

categoryRouter.get("/categories", categoryController.getAll);

categoryRouter.get("/category/:id", categoryController.getSingle);

categoryRouter.post("/categories", categoryController.post);

categoryRouter.put("/category/:id", categoryController.put);

categoryRouter.delete("/category/:id",categoryController.delete);


export default categoryRouter;