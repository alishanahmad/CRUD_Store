import productModel from "../../model/product/index.js";

const productController = {
  getAll: async (req, res) => {
    try {
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
    try {
      if (!req.body.name || !req.body.price || req.body.stock === undefined) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const product = await productModel.create({
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
      });
      // await product.save();
      res.status(201).json({ message: "Product created", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  put: async (req, res) => {
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
      // const { id } = req.params;
      const product = await productModel.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await product.destroy();
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
