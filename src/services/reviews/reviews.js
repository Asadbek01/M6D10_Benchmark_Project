import { Router } from "express";
import {Review, Products} from "../../utils/db/models/relation.js";
import moment from 'moment'

const reviewRouter = Router();
//1 
reviewRouter.post("/", async (req, res, next) => {
  try {
   const review = await Review.create(req.body)
    res.status(201).send(review);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//2.
reviewRouter.get("/", async (req, res, next) => {
  try {
    const review = await Review.findAll({
    });
    res.send(review);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
 
// //3 
reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
if (review) {
  res.send(review)
  } else {
        res.status(404).send("Not found");
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
});

// //4.
 
reviewRouter.put("/:id", async (req, res, next) => {
  try {
     const updateReview = await Review.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });

      res.send(updateReview[1][0]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });
 
//5.

reviewRouter.delete("/:id", async (req, res, next) => {
  try {
   const result = await Review.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (result > 0) {
        res.send("ok");
      } else {
        res.status(404).send("not found");
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  });


export default reviewRouter;