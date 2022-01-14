import express from "express";
import {Cart, Products, Users, Categories} from "../../utils/db/models/relation.js";
import {Sequelize} from "sequelize" 
const cartRouter = express.Router();

cartRouter.get("/:userId", async (req, res, next) => {
  try {
   const cart = await Cart.findAll({
     attributes:[
       "productId",
    
        [Sequelize.fn('COUNT', Sequelize.col("productId")), "unitaryQty"],
        [Sequelize.fn('SUM', Sequelize.col("product.price")), "unitaryPrice"]
      ],
     group:["productId", "product.id", "user.id", "product->category.id"],
     include:[{model:Products, include:Categories}, Users]

    })

const totalQty = await Cart.count({where:{userId:req.params.userId}})

const totalPrice = await Cart.sum("product.price", {where:{userId:req.params.userId}, include:{model:Product, attributes:[]} })
   res.send({cart, totalPrice, totalQty})
  } catch (e) {
    console.log(e);
    next(e);
  }
});
cartRouter.post("/:userId/:productId", async (req, res, next) => {
    try {
     const rawCart = await Cart.create({productId:req.params.productId, userId:req.params.userId})
     res.send(rawCart)
    } catch (e) {
      console.log(e);
      next(e);
    }
  });
  

export default cartRouter;