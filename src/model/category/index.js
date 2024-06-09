import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";

const categoryModel = sequelize.define("Category", {
    name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default categoryModel;