import { Router } from "express";
import categoryController from "../../controller/category/index.js";
import authenticateMiddleware from "../../middleware/auth.js";
const categoryRouter = Router();

categoryRouter.get("/categories", categoryController.getAll);
categoryRouter.get("/category/:id", categoryController.getSingle);
categoryRouter.post("/categories",authenticateMiddleware, categoryController.post);
categoryRouter.put("/category/:id",authenticateMiddleware, categoryController.put);
categoryRouter.delete("/category/:id",authenticateMiddleware,categoryController.delete);


export default categoryRouter;