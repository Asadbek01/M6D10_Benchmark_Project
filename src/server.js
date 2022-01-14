import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import listEndpoints from "express-list-endpoints";
dotenv.config();
import productRouter from "./services/models/products/index.js";
import reviewRouter from "./services/models/reviews/reviews.js";
import mongoose from "mongoose";
// import CartRouter from "./services/shoppingCart/cart.js"

const server = express();
const PORT = process.env.PORT;
server.use(express.json());
server.use(cors());

server.use("/products", productRouter);
server.use("/reviews", reviewRouter);
//  server.use("/cart", CartRouter)

mongoose.connect(process.env.MONGO_CONNECTION);
const port = process.env.PORT;
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo!");

  server.listen(port, () => {
    console.log(`Server running on port ${PORT}`);
    console.table(listEndpoints(server));
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
