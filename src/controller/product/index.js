import productModel from "../../model/product/index.js";
import categoryModel from "../../model/category/index.js";
import { Op } from "sequelize";
import Joi from "joi";
const productController = {
  getAll: async (req, res) => {

    try {
      
      const  {search}  = req.query;

      const products = await productModel.findAll();
      if (!products) {
        return res.status(404).json({ message: "No products found" });
      }
      res.status(200).json({ data: products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error at getAll" });
    }
  },

  getSingle: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productModel.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ data: product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  post: async (req, res) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      price: Joi.double().min(3).max(30).required(),
      stock:Joi.double().min(0).max().required(),
      categoryId:Joi.integer().min(0).max().required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    try {
      if (!req.body.name || !req.body.price || req.body.stock === undefined) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const product = await productModel.create({
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        categoryId:req.body.categoryId
      });
      res.status(201).json({ message: "Product created", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  put: async (req, res) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      price: Joi.double().min(3).max(30).required(),
      stock:Joi.double().min(0).max().required(),
      categoryId:Joi.integer().min(0).max().required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    try {
      const product = await productModel.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.name = req.body.name;
      product.price = req.body.price;
      product.stock = req.body.stock;

      await product.save();

      res
        .status(200)
        .json({ message: "Product successfully updated", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  delete: async (req, res) => {
    try {
      const product = await productModel.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      } else {
        await product.destroy();
      }
      res
        .status(200)
        .json({ message: "Product deleted successfully", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default productController;
