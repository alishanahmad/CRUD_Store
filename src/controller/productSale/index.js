import saleModel from "../../model/sale/index.js";
import productSaleModel from "../../model/productSale/index.js";
import productModel from "../../model/product/index.js";

const productSaleController = {
  getAll: async (req, res) => {
    try {
      const productSales = await productSaleModel.findAll({
        include: [
          { model: productModel, attributes: ["name", "price"] },
          { model: saleModel, attributes: ["amount"] },
        ],
      });
      if(!productSales){
        req.status(404).json({
          message: "not found products sold",
        });
      }
      else{
        res.status(200).json({message:"all sold Products are here:",productSales});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error", error });
    }
  },
  getSingle: async (req, res) => {
    try {
      const productSales = await productSaleModel.findOne({
        where: req.params,
      });
      if (!productSales) {
        res.status(404).json({
          message: "not found products sold",
        });
      } else {
        req.status(200).json({
          message: "found products sold",
          productSales,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error", error });
    }
  },
  post: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  put: async (req, res) => {
    try {
      const productSales = await productSaleModel.findOne({
        where: req.params,
      });
      if (!productSales) {
        res.status(404).json({
          message: "not found products sold",
        });
      } else {
        req.status(200).json({
          message: "found products sold",
          productSales,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error", error });
    }
  },
  delete: async (req, res) => {
    try {
      const productSales = await productSaleModel.findOne({
        where: req.params,
      });
      if (!productSales) {
        res.status(404).json({
          message: "not found products sold",
        });
      } else {
        req.status(200).json({
          message: "found products sold",
          productSales,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error", error });
    }
  },
};
export default productSaleController;
