import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import saleModel from "../sale/index.js";
import productModel from "../product/index.js";

const productSaleModel = sequelize.define("SaleProducts", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  saleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

saleModel.hasMany(productSaleModel, { foreignKey: "saleId" });
productSaleModel.belongsTo(saleModel, { foreignKey: "saleId" });

productModel.hasMany(productSaleModel, { foreignKey: "productId" });
productSaleModel.belongsTo(productModel, { foreignKey: "productId" });

export default productSaleModel;
