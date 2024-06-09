import categoryModel from "../../model/category/index.js";

const categoryController = {
  getAll: async (req, res) => {
    try {
      const category = await categoryModel.findAll();
      res.status(200).json({
        data: category,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  getSingle: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await categoryModel.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "No category with this name" });
      }
      res.status(200).json({ data: category });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  post: async (req, res) => {
    try {
      console.log(req.body, "payload");
      const category = new categoryModel();
      category.name = req.body.name;
      await category.save();
      res.status(200).json({ message: "category created", category });
    } 
    catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
export default categoryController;
