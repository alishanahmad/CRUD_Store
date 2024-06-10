import productsRouter from "./product/index.js";
import salesRouter from "./sale/index.js";
import productSaleRouter from "./productSale/index.js";
import categoryRouter from "./category/index.js";
import userRoute from "./user/index.js";

const allRoute = [productsRouter, salesRouter, productSaleRouter,categoryRouter,userRoute];
export default allRoute;
