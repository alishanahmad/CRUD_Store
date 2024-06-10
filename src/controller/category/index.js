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
      const category = await categoryModel.findOne({ where: req.params });
      if (!category) {
        return res.status(404).json({ message: "No category with this name" });
      }
      res.status(200).json({ data: category });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  post: async (req, res) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    try {
      console.log(req.body, "payload");
      const category = await categoryModel.create({
        name: req.body.name,
      });
      await category.save();
      res.status(200).json({ message: "category created", category });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  put: async (req, res) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    try {
      const category = await categoryModel.findByPk(req.params.id);
      if (!category) {
        res.status(404).json({
          message: "category not found",
        });
      } else {
        category.name = req.body.name;
      }
      await category.save();
      res.status(200).json({ message: "category created", category });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  delete: async (req, res) => {
    try {
      const category = await categoryModel.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "category not found" });
      }
      else{
        await category.destroy();
      }
      res
        .status(200)
        .json({ message: "category deleted successfully", category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
export default categoryController;
