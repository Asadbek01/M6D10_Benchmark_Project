import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import listEndpoints from "express-list-endpoints"
dotenv.config()
import productRouter from './services/products/index.js'
import reviewRouter from './services/reviews/reviews.js'
// import CartRouter from "./services/shoppingCart/cart.js"


 const server = express()
 const PORT = process.env.PORT
 server.use(express.json())
 server.use(cors())

 server.use('/products', productRouter)
 server.use('/reviews', reviewRouter)
//  server.use("/cart", CartRouter)

mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo!")

  server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log(`Server running on port ${PORT}`)
  })
})

mongoose.connection.on("error", err => {
  console.log(err)
})