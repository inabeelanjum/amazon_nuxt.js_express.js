const router = require("express").Router();
const Category = require("../models/category");

router.post("/categories", async (req, res) => {
	try {
		let category = new Category();
		category.type = req.body.type;
		await category.save();
		res.json({
			sucess: true,
			message: "sucessfully created a new category",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});
// get request

router.get("/categories", async (req, res) => {
	try {
		let categories = await Category.find();
		res.json({
			sucess: true,
			categories: categories,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});
module.exports = router;
