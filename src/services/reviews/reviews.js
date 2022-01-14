import express from "express";
import createHttpError from "http-errors";
import q2m from "query-to-mongo";
import ReviewModel from "../../utils/db/Schema/reviews.js"

const reviewRouter = express.Router();
//1 
reviewRouter.post("/", async (req, res, next) => {
  try {
   const review = await ReviewModel.create(req.body)
    res.status(201).send(review);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//2.
reviewRouter.get("/", async (req, res, next) => {
  try {
    const review = await ReviewModel.findAll({
    });
    res.send(review);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
 
// //3 
reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const review = await ReviewModel.findByPk(req.params.id);
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
     const updateReview = await ReviewModel.update(req.body, {
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
   const result = await ReviewModel.destroy({
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