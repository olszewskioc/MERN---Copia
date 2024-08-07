import dotenv from "dotenv";
dotenv.config();
import connectToDatabase from "./db.js";
import express from "express";
import cors from "cors";

// Routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

connectToDatabase();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
// localhost:5000/api/products

app.get("/api/config/google", (req, res) => res.send(process.env.GOOGLE_CLIENT_ID));

const port = 5000;

app.get("/", (req, res) => {
	res.send("Welcome to the API");
});

app.listen(port, () => {
	console.log(`Server run in port ${port}`);
});
