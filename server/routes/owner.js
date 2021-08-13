const router = require("express").Router();
const Owner = require("../models/owner");
const upload = require("../middlewares/upload-photo");

router.post("/owner", upload.single("photo"), async (req, res) => {
	try {
		let owner = new Owner();
		owner.name = req.body.name;
		owner.about = req.body.about;
		owner.photo = req.file.location;
		await owner.save();
		res.json({
			success: true,
			message: "owner successfully added",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

//get request
router.get("/owner", async (req, res) => {
	try {
		let owners = await Owner.find();
		res.json({
			success: true,
			owners: owners,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});
module.exports = router;
