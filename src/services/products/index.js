import express from "express";
import createHttpError from "http-errors";
import q2m from "query-to-mongo";
import ProductModel from "../../utils/db/Schema/products.js"


const productRouter = express.Router();
//1 
productRouter.post("/", async (req, res, next) => {
  try {
   const product = await ProductModel.create(req.body)
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//2.
productRouter.get("/", async (req, res, next) => {
  try {
    const product = await ProductModel.findAll({
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
    const product = await ProductModel.findByPk(req.params.id);
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
     const updateUser = await ProductModel.update(req.body, {
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
   const result = await ProductModel.destroy({
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