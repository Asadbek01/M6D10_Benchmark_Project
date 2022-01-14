import { Router } from "express";
import {Products, Review, Categories, Users, productCategory} from "../../utils/db/models/relation.js";
import Sequelize from "sequelize"

const productRouter = Router();
//1 
productRouter.post("/", async (req, res, next) => {
  try {
   const product = await Products.create(req.body)
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//2.
productRouter.get("/", async (req, res, next) => {
  try {
    const product = await Products.findAll({
  include: [Review, Categories, Users]
    
    });
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
 
// //3 
productRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await Products.findByPk(req.params.id);
if (product) {
  res.send(product)
  } else {
        res.status(404).send("Not found");
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
});

// //4.
 
productRouter.put("/:id", async (req, res, next) => {
  try {
     const updateUser = await Products.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });

      res.send(updateUser[1][0]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });
 
//5.

productRouter.delete("/:id", async (req, res, next) => {
  try {
   const result = await Products.destroy({
        where: {
          id: req.params.id,
        },
      });

     res.send(result)
      
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

export default productRouter;