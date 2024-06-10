import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";
// import productModel from "../product/index.js";

const categoryModel = sequelize.define("Category", {
    name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default categoryModel;