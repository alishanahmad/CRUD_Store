import saleModel from "../../model/sale/index.js";
import productSaleModel from "../../model/productSale/index.js";
import productModel from "../../model/product/index.js";

const saleController = {
  getAll: async (req, res) => {
    try {
      const sales = await saleModel.findAll({
        include: [
          {
            model: productSaleModel,
            include: [
              {
                model: productModel,
                attributes: ['name', 'price']
              }
            ]
          }
        ]
      });
      res.json({ data: sales });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },

  getSingle: async (req, res) => {
    try {
      const { id } = req.params;
      const sale = await saleModel.findByPk(id, {
        include: [
          {
            model: productSaleModel,
            include: [
              {
                model: productModel,
                attributes: ['name']
              }
            ]
          }
        ]
      });
      if (!sale) {
        return res.status(404).json({ message: "no sale with this id" });
      }
      res.status(200).json({ data: sale });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  }
};

export default saleController;