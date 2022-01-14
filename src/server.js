import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import listEndpoints from "express-list-endpoints"
dotenv.config()
import productRouter from './services/products/index.js'
import reviewRouter from './services/reviews/reviews.js'
import categoryRouter from './services/category/index.js'
import usersRouter from './services/users/users.js'
import CartRouter from "./services/shoppingCart/cart.js"
import sequelize, { testDbConnection } from './utils/db/connect.js'


 const server = express()
 const PORT = process.env.PORT
 server.use(express.json())
 server.use(cors())

 server.use('/products', productRouter)
 server.use('/reviews', reviewRouter)
 server.use("/categories", categoryRouter )
 server.use("/users", usersRouter)
 server.use("/cart", CartRouter)

 server.listen( process.env.PORT || 3001 ,  async()=>{
     console.log(`Server is running with ${PORT}`)
     await testDbConnection();
     await sequelize.sync();

     console.table(listEndpoints(server))
 })

 server.on("error", (error) => {
     console.log('Server isnt running', error)
 })