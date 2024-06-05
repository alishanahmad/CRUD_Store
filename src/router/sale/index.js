import { Router } from "express";
import saleController from "../../controller/sale/index.js";
import saleModel from "../../model/sale/index.js";
// import authenticateMiddleware from "../../middleware/auth.js";
const salesRouter = Router();

salesRouter.get("/sales", saleController.getAll);
salesRouter.get("/sale/:id", saleController.getSingle);
salesRouter.get("/sale/productName",saleController.getSingleProduct)
salesRouter.post("/sales", saleController.post);
// salesRouter.put("/sale/:id",saleController.put);
salesRouter.delete("/sale/:id",saleController.delete)

export default salesRouter;