const router = require("express").Router();
const Product = require("../models/product");
const upload = require("../middlewares/upload-photo");

router.post("/products", upload.single("photo"), async (req, res) => {
	try {
		let product = new Product();
		product.title = req.body.title;
		product.description = req.body.description;
		product.photo = req.file.location;
		product.price = req.body.price;
		product.stockQuantity = req.body.stockQuantity;

		await product.save();

		res.json({
			success: true,
			message: " successfully saved",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});
// get all products
router.get("/products", async (req, res) => {
	try {
		let products = await Product.find();
		res.json({
			sucess: true,
			products: products,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

// get single product
router.get("/products/:id", async (req, res) => {
	try {
		let product = await Product.findOne({ _id: req.params.id });
		res.json({
			sucess: true,
			product: product,
		});
	} catch (error) {
		res.status(500).json({
			sucess: false,
			message: error.message,
		});
	}
});

// update single product
router.put("/products/:id", upload.single("photo"), async (req, res) => {
	try {
		let product = await Product.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					title: req.body.title,
					description: req.body.description,
					photo: req.file.location,
					price: req.body.price,
					stockQuantity: req.body.stockQuantity,
					category: req.body.categoryID,
					owner: req.body.ownerID,
				},
			},
			{ upsert: true }
		);
		res.json({
			sucess: true,
			updatedProduct: product,
		});
	} catch (error) {
		res.status(500).json({
			sucess: false,
			message: error.message,
		});
	}
});
// Delete a single product

router.delete("/products/:id", async (req, res) => {
	try {
		let deleteProduct = await Product.findOneAndDelete({
			_id: req.params.id,
		});
		if (deleteProduct) {
			res.json({
				sucess: true,
				message: "sucessfully Deleted",
			});
		}
	} catch (error) {
		res.status(500).json({
			sucess: false,
			message: error.message,
		});
	}
});
module.exports = router;
