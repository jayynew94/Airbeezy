const express = require("express");

const { Spot, User, Review, ReviewImage, SpotImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

//Get reviews of current User
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.dataValues.id;
  const getReviews = await Review.findAll({
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"]},
      { model: Spot, attributes: ["id", "ownerId", "address","city","state","country","lat","lng","name","price"], include : {
          model:SpotImage, where:{ preview: true}
      }},
      { model: ReviewImage, attributes: ["id","url"]},
    ],
    where:{
        userId: userId
    },
    nest: true
  });

 
  let reviewList = []
  getReviews.forEach((review) => {
    reviewList.push(review.toJSON())
})


reviewList.forEach(review => {
  review.Spot.SpotImages.forEach(spotImage => { 
    if(spotImage.preview === true){
      review.Spot.previewImage = spotImage.url
    }
  })
  delete review.Spot.SpotImages
})
  
 return res.json({
   "Reviews":reviewList
  })
 
});
    //create image for review
  router.post("/:reviewId/images", requireAuth, async (req, res) => {
    const { url, previewImage } = req.body;
    const { reviewId } = req.params;

    const reviews = await Review.findByPk(reviewId);
    console.log(reviews);

    if (reviews) {
      const createImage = await ReviewImage.create({
        url,
        reviewId: reviews.dataValues.id,
        userId: req.user.id,
        previewImage,
      });

      const imageAdd = {
        id: createImage.id,
        url: createImage.url,
        previewImage,
      };
      res.status(200);
      res.json(imageAdd);
    } else {
      res.status(404);
      return res.json({
        message: "Review couldn't be found",
        statusCode: 404,
      });
    }
  });

  //edit a review

router.put("/:reviewId", requireAuth, async (req, res) => {
  const { reviewId } = req.params;

  const { review, stars } = req.body;

  const editReview = await Review.findByPk(reviewId);

  if (editReview) {
    editReview.set({
      review,
      stars,
    });
    await editReview.save();
    res.json(editReview);
  } else if (stars < 1 || stars > 5) {
    res.status(400);
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        review: "Review text is required",
        stars: "Stars must be an integer from 1 to 5",
      },
    });
  } else {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
});

//delete a review

router.delete("/:reviewId", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const findReview = await Review.findByPk(reviewId);
  console.log(findReview)


  if (!findReview) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  await findReview.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });

}); 



module.exports = router