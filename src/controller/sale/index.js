// import saleModel from "../../model/sale/index.js";

// const ProductController = {
//   getAll: async (req, res) => {
//     try {
//       const sales = await saleModel.findAll();

//       if (!sales) {
//         console.log("Product doesn't exist");
//       }
//       res.json({ data: sales });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "internal server error at getAll" });
//     }
//   },

//   getSingle: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const sale = await saleModel.findByPk(id);
//       if (!sale) {
//         return res.status(404).json({ message: "no sale with this name" });
//       }
//       res.status(200).json({ data: sale });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "internal server error" });
//     }
//   },

//   post: async (req, res) => {
//     try {
//       const payload = req.body;
//       const sale = new saleModel();
//       sale.amount = payload.amount;


//       await sale.save();

//       res.status(200).json({ message: "Sale created", sale });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "internal server error" });
//     }
//   },
//   put: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const payload = req.body;
//       console.log("id is this in put ", id);
//       const sale = await saleModel.findByPk(id);
//       if (!id) {
//         res.status(404).json({
//           message: "not found",
//         });
//       }
//       sale.name = payload.name;


//       await sale.save();
//       res.json({
//         message: "successfully updated.",
//         sale,
//       });

//       // res.status(200).json({ message: "Product created", sale });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "internal server error" });
//     }
//   },
//   delete: async (req, res) => {
//     try {
//       const { id } = req.params;
//       // const payload=req.body;
//       console.log(
//         "------------------------------------------------------------id is this in put ",
//         id
//       );
//       const sale = await saleModel.findByPk(id);
//       if (!sale) {
//         res.status(404).json({
//           message: "not found",
//         });
//       }

//       await sale.destroy();
//       res.json({
//         message: "sale deleted successfully",
//         sale,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "internal server error" });
//     }
//   },
// };
// export default ProductController;


import { where } from "sequelize";
import saleModel from "../../model/sale/index.js";
import saleProductsModels from "../../model/sale/index.js";
// import employRouter from "../../router/employ/index.js";
import productModel from "../../model/product/index.js";

const saleController = {
  getAll: async (req, res) => {
    try {
      const sales = await saleModel.findAll({
        // include: [ProductModel],
      });
      res.json({ data: sales });
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  getSingle: async (req, res) => {
    try {
      const { id } = req.params;
      const sale = await saleModel.findByPk(id, {
        include: [
          {
            model: saleProductsModels,
            include: [
              {
                model: productModel,
                attributes:['name']
              },
            ],
          },
        ],
      });
      if (!sale) {
        res.status(404).json({ message: "no sale with this name" });
      }
      res.status(200).json({ data: sale });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
  getSingleProduct: async (req, res) => {
    try {
      // const { id } = req.params;
      const { productName } = req.query;
      const payload = req.body;
      const pname = await saleProductsModels.findAndCountAll(productName, {
        where: {
          // productName: payload.productName,
          productName: "book",
        },
      });
      console.log(pname);

      if (!pname) {
        res.status(404).json({ message: "no product with this name" });
      }
      res.status(200).json({ data: pname });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },

  post: async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;
      console.log("id is this in put ", id);
      const sale = await saleModel.findByPk(id);
      if (!id) {
        res.status(404).json({
          message: "not found",
        });
      }
      sale.name = payload.name;


      await sale.save();
      res.json({
        message: "successfully updated.",
        sale,
      });

      // res.status(200).json({ message: "Product created", sale });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const saleProduct = await saleProductsModels.findByPk(id);
      await saleProduct.destroy({ where: { id: id } });

      res
        .status(200)
        .json({ message: "product delete successfully", saleProduct });
      console.log(saleProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
};
export default saleController;
