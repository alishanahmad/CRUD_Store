import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";
import categoryModel from "../category/index.js"
const productModel = sequelize.define("Products", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.DOUBLE,
  },
  price: {
    type: DataTypes.DOUBLE,
  },
  categoryId:{
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories', // 'Categories' refers to table name
      key: 'id',
    },
  }
});

productModel.belongsTo(categoryModel, { foreignKey: 'categoryId' });
productModel.belongsToMany(categoryModel, { through: "categoryProducts" });
categoryModel.belongsToMany(productModel, { through: "categoryProducts" });

export default productModel;
