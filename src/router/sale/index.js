import { Router } from "express";
import saleController from "../../controller/sale/index.js";
import authenticateMiddleware from "../../middleware/auth.js";
const salesRouter = Router();

salesRouter.get("/sales",authenticateMiddleware, saleController.getAll);
salesRouter.get("/sale/:id",authenticateMiddleware, saleController.getSingle);

export default salesRouter;
