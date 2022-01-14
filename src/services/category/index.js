import express from "express";
import {Categories, Products} from "../../utils/db/models/relation.js";
import { Op } from "sequelize";
const categoryRouter = express.Router();

// 1 
categoryRouter.get("/", async (req, res, next) => {
    try {
      const data = await Categories.findAll();
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  // 2
  categoryRouter.post("/", async (req, res, next) => {
      try {
        const categories = await Categories.create(req.body)
        res.status(201).send(categories)
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

  categoryRouter.get("/:id", async (req, res, next) => {

    try {
        const category = await Categories.findByPk(req.params.id);
        if (category) {
          res.send(category)
          } else {
                res.status(404).send("Not found");
              }
    } catch (e) {
      console.log(e);
      next(e);
    }
  })


  categoryRouter.put("/:id", async (req, res, next) => {
    try {
        const updateCategory = await Categories.update(req.body, {
            where: { id: req.params.id },
            returning: true,
          });
    
          res.send(updateCategory[1][0]);

    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  categoryRouter.delete("/:id", async (req, res, next) => {
    try {
 const result = await Categories.destroy({
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

export default categoryRouter;