import express from "express";
import createHttpError from "http-errors";
import q2m from "query-to-mongo";
import ProductsModel from "../../Schema/products.js";

const productRouter = express.Router();
//1
productRouter.post("/", async (req, res, next) => {
  try {
    //  const product = await ProductModel.create(req.body)
    //   res.status(201).send(product);
    const newProduct = new ProductsModel(req.body);
    const { _id } = await newProduct.save();

    res.status(201).send(newProduct);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//2.
productRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductsModel.find();
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// //3
productRouter.get("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const product = await ProductsModel.findById(productId);
    if (product) {
      res.send(product);
    } else {
      next(createHttpError(404, `Product with id ${productId} not found!`));
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// //4.

productRouter.put("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const updateProduct = await ProductsModel.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
      }
    );
    if (updateProduct) {
      res.send(updateProduct);
    } else {
      next(createHttpError(404, `Product with id ${productId} not found!`));
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//5.

productRouter.delete("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await ProductsModel.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `User with id ${productId} not found!`));
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

                            // **************reviews*************

productRouter.post("/:productId/reviews" , async(req, res, next) =>{
  try {
    const productId = await ProductsModel.findById(req.params.productId)
    if(productId) {
      const postReview = { ...productId.toObject(),  rate:req.body.rate, text:req.body.text} 
      const modifyProduct = await ProductsModel.findByIdAndUpdate(req.params.productId, {$push:{reviews:postReview}}, {new:true})
     
      if(modifyProduct){
          res.send(modifyProduct)
      }
    }
  } catch (error) {
    
  }
})
 
productRouter.get("/:productId/reviews", async(req, res, next)=>{
  try {
    const productId = await ProductsModel.findById(req.params.productId)
    if(productId) {
      res.send(productId.reviews)
    }
  } catch (error) {
    
  }
})
productRouter.get("/:productId/reviews/:reviewsId", async(req,res,next)=>{
try {
  const productId = await ProductsModel.findById(req.params.productId)
  if(productId) {
   const postedReview = productId.reviews.find(review => review._id.toString() === req.params.reviewsId)
   if(postedReview){
     res.send(postedReview)
   }
  }

  
} catch (error) {
  
}
})

productRouter.put("/:productId/reviews/reviewsId", async(req,res,next)=>{
  try {
    
  } catch (error) {
    
  }
  })

  productRouter.delete("/:productId/reviews/reviewsId", async(req,res,next)=>{
    try {
      
    } catch (error) {
      
    }
    })

export default productRouter;
