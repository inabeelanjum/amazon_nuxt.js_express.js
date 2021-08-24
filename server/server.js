// VhaFS2M9gFKYci4 amazone password
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); //user model remove kia hai idr sy if any error occurs
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
mongoose.connect(
	process.env.DATABASE,
	{ useUnifiedTopology: true, useNewUrlParser: true },
	(err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("database connected");
		}
	}
);

// Middlewares //
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// apis
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/category");
const ownerRoutes = require("./routes/owner");
const userRoutes = require("./routes/auth");
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ownerRoutes);
app.use("/api", userRoutes);

app.listen(8000, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("listening on Port ", 8000);
	}
});
