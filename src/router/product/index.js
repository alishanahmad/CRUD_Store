import { Router } from "express";
import productController from "../../controller/product/index.js";
const productsRouter = Router();

productsRouter.get("/products", productController.getAll);
productsRouter.get("/product/:id", productController.getSingle);
productsRouter.post("/products", productController.post);
productsRouter.put("/product/:id", productController.put);
productsRouter.delete("/product/:id", productController.delete);

export default productsRouter;
