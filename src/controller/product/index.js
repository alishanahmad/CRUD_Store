import productModel from "../../model/product/index.js";

const productController = {
  getAll: async (req, res) => {
    try {
      const products = await productModel.findAll();

      if (!products) {
        console.log("Product doesn't exist");
      }
      res.json({ data: products });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error at getAll" });
    }
  },

  getSingle: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productModel.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "no product with this name" });
      }
      res.status(200).json({ data: product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },

  post: async (req, res) => {
    try {
      const payload = req.body;
      const product = new productModel();
      product.name = payload.name;
      product.price = payload.price;
      product.stock = payload.stock;

      await product.save();

      res.status(200).json({ message: "Product created", product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
  put: async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;
      console.log("id is this in put ", id);
      const product = await productModel.findByPk(id);
      if (!id) {
        res.status(404).json({
          message: "not found",
        });
      }
      // res.status(302).json({
      //   message:"found",
      // })
      product.name = payload.name;
      product.price = payload.price;
      product.stock = payload.stock;

      await product.save();
      res.json({
        message: "successfully updated.",
        product,
      });

      // res.status(200).json({ message: "Product created", product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      // const payload=req.body;
      console.log(
        "------------------------------------------------------------id is this in put ",
        id
      );
      const product = await productModel.findByPk(id);
      if (!product) {
        res.status(404).json({
          message: "not found",
        });
      }

      await product.destroy();
      res.json({
        message: "product deleted successfully",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
};
export default productController;

