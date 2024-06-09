import productsRouter from "./product/index.js";
import salesRouter from "./sale/index.js";
import productSaleRouter from "./productSale/index.js";
import categoryRouter from "./category/index.js";

const allRoute = [productsRouter, salesRouter, productSaleRouter,categoryRouter];
export default allRoute;
