import { Router } from "express";
import saleController from "../../controller/sale/index.js";

const salesRouter = Router();

salesRouter.get("/sales", saleController.getAll);
salesRouter.get("/sale/:id", saleController.getSingle);

export default salesRouter;
