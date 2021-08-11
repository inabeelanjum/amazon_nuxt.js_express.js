const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	type: {
		type: String,
		unique: true,
		required: true,
	},
});
module.exports = mongoose.model("category", categorySchema);
