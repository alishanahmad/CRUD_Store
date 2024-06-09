import productModel from "../model/product/index.js";
import saleModel from "../model/sale/index.js";
import productSaleModel from "../model/productSale/index.js"
import categoryModel from "../model/category/index.js";

import sequelize from "./config.js";

const syncDB=async()=>{
    await sequelize.sync({ alter: true, force: false});  
}
export default syncDB;