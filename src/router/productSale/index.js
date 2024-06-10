import { Router } from "express";
import productSaleController from "../../controller/productSale/index.js";
import authenticateMiddleware from "../../middleware/auth.js";
const productSaleRouter = Router();

productSaleRouter.get("/productsales", productSaleController.getAll);
productSaleRouter.get("/productsale/:id", productSaleController.getSingle);
productSaleRouter.post("/productsales",authenticateMiddleware, productSaleController.post);
productSaleRouter.put("/productsale/:id",authenticateMiddleware,productSaleController.put);
productSaleRouter.delete("/productsale/:id",authenticateMiddleware,productSaleController.delete)

export default productSaleRouter;