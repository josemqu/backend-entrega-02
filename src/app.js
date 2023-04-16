import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import socket from "./socket.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { productModel } from "./models/products.model.js";

dotenv.config();
const app = express();

const PORT = 8080;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(`${__dirname}/public`));

const environment = async () => {
	mongoose.connect(
		`mongodb+srv://${DB_USER}:${DB_PASSWORD}@codercluster.tgft5r9.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
	);

	const products = await productModel.paginate(
		{ category: "Blue" },
		{ limit: 5, page: 1 }
	);

	console.log(products);
};

environment();

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, (req, res) => {
	console.log(`Server listening on port ${PORT}`);
});

socket.connect(httpServer);
