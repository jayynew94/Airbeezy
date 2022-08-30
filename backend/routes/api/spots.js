const express = require("express");
const {
  Spot,
  User,
  Review,
  Booking,
  SpotImage,
  sequelize,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const { Op } = require("sequelize");

const router = express.Router();



///GET ALL SPOTS
//Part 1
router.get("/", async (req, res) => {
   let { page, size } = req.query;
   page = parseInt(page)
   size = parseInt(size)


   const pagination = {};

   if (!page) page = 1;
   if (!size) size = 20;

   if (page >= 1 && size >= 1) {
     pagination.limit = size;
     pagination.offset = size * (page - 1);
   }

  const allSpots = await Spot.findAll({
  ...pagination
  });

  
  //Iterate through each spot in allSpots variable
  for (let spot of allSpots) {
    const findImage = await SpotImage.findOne({
      attributes: ["url"],
      where: {
        preview: true,
        spotId: spot.id,
      },
      raw: true,
    });
   
    if (findImage) {
      spot.dataValues.previewImage = findImage.url;
    } else {
      spot.dataValues.previewImage = null;
    }

    const findReview = await spot.getReviews({
      attributes: [
          [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
    ]
    });
      if(findReview){
        spot.dataValues.avgRating = findReview[0].dataValues.avgRating
      }else{
        spot.dataValues.avgRating = null;
      }
  }
  res.status(200);
  res.json({ 
    "Spots":allSpots,
    "page": page,
    "size": size
   });
});










module.exports = router