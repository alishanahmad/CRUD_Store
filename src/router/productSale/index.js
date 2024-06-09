import { Router } from "express";
import productSaleController from "../../controller/productSale/index.js";
const productSaleRouter = Router();

productSaleRouter.get("/productsales", productSaleController.getAll);
productSaleRouter.get("/productsale/:id", productSaleController.getSingle);
productSaleRouter.post("/productsales", productSaleController.post);
productSaleRouter.put("/productsale/:id",productSaleController.put);
productSaleRouter.delete("/productsale/:id",productSaleController.delete)

export default productSaleRouter;