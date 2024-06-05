import sequelize from '../../db/config.js';
import { DataTypes } from 'sequelize';
import saleModel from '../sale/index.js';
import productModel from '../product/index.js';

const saleProductsModel = sequelize.define(
  'SaleProducts',
  {
    productName: {
        type: DataTypes.STRING,
        allowNull:false
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    rate: {
        type: DataTypes.DOUBLE
    }
  }
);

saleModel.hasMany(saleProductsModel);
saleProductsModel.belongsTo(saleModel);

productModel.hasMany(saleProductsModel);
saleProductsModel.belongsTo(productModel);


export default saleProductsModel;