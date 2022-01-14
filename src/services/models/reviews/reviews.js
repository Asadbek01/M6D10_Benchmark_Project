import express from "express";
import createHttpError from "http-errors";
import q2m from "query-to-mongo";
import ReviewModel from "../../Schema/reviews.js"

const reviewRouter = express.Router();
//1 
reviewRouter.post("/:productId/reviews", async (req, res, next) => {
  try {
    
   const newReview = await ReviewModel(req.body)
   const {_id} = await newReview.save()
    res.status(201).send({ _id});
  } catch (error) {
   next({ message: error.message });
  }
});

//2.
reviewRouter.get("/", async (req, res, next) => {
  try {
    const review = await ReviewModel.find()
    res.send(review);
  } catch (error) {
    next({ message: error.message });
  }
});
 
// //3 
reviewRouter.get("/:reviewId", async (req, res, next) => {
  try {
    if(req.params.reviewId.length !== 24) return next(createHttpError(404, "Wrong Id number"))
    const review = await ReviewModel.findById(req.params.reviewId);
    if(!review) return next(createHttpError(404, `The review id with ${req.params.reviewId} is could not find`))
      res.send(review)
    } catch (e) {
      console.log(e);
      next(e);
    }
});

// //4.
 
reviewRouter.put("/:reviewId", async (req, res, next) => {
  try {
     const updateReview = await ReviewModel.findByIdAndUpdate(req.params.reviewId, req.body, {new: true})
      if (!updateReview) return next(createHttpError(404, `The review id with ${req.params.reviewId} is could not find`))
      res.send(updateReview)
    } catch (e) {
      console.log(e);
      next(e);
    }
  });
 
//5.

reviewRouter.delete("/:reviewId", async (req, res, next) => {
  try {
   const result = await ReviewModel.findByIdAndDelete(req.params.reviewId) 
    if(!result) return next(createHttpError(404,`The review id with ${req.params.reviewId} is could not find`))
    res.send(result)
    } catch (e) {
      console.log(e);
      next(e);
    }
  });


export default reviewRouter;