  const express=require("express");
  const router=express.Router({mergeParams:true});
  const wrapAsync =require("../utils/wrapAsync.js");
  const ExpressError = require("../utils/ExpressError.js");
  const {listingSchema, reviewSchema}= require("../schema.js");
const Review=require("../models/review.js");
const Listing = require("../models/listing.js");
const reviewController = require("../controllers/review.js");
const { createReview, destroyReview } = require("../controllers/review.js");
const { destroyListing } = require("../controllers/listing.js");

const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error)
      {
        let errMsg= error.details.map((el)=>el.messege).join(",");
        throw new ExpressError(400,errMsg);
      }
      else{
        next();
      }
  };



  //REVIEWS POST ROUTE

  router.post("/", validateReview,
    wrapAsync(reviewController.createReview));
  
  //DELETE REVIEW ROUTE
  router.delete("/:reviewId",
    wrapAsync(reviewController.destroyReview)
  );
  module.exports=router;