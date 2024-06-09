import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const saleModel = sequelize.define("Sales", {
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  reserved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default saleModel;
