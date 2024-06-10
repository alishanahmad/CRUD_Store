import { Router } from "express";
import productController from "../../controller/product/index.js";
import authenticateMiddleware from "../../middleware/auth.js";
const productsRouter = Router();

productsRouter.get("/products", productController.getAll);
productsRouter.get("/product/:id", productController.getSingle);
productsRouter.post("/products",authenticateMiddleware, productController.post);
productsRouter.put("/product/:id",authenticateMiddleware, productController.put);
productsRouter.delete("/product/:id",authenticateMiddleware, productController.delete);

export default productsRouter;
