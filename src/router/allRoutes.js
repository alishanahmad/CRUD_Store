import productsRouter from "./product/index.js";
import salesRouter from "./sale/index.js";
import productSaleRouter from "./productSale/index.js";

const allRoute = [productsRouter, salesRouter, productSaleRouter];
export default allRoute;
