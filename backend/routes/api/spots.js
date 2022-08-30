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

///GET current User Spots
router.get("/current", requireAuth, async (req, res) => {
  const currentSpot = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
  });

  for (let spot of currentSpot) {
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
      attributes: 
      [
        [ sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
    ],
      
    });
    if (findReview) {
      spot.dataValues.avgRating = findReview[0].dataValues.avgRating;
    } else {
      spot.dataValues.avgRating = null;
    }
  }
  res.status(200);
  return res.json({
    Spots: currentSpot,
  });
});

//Get spot by spotId
router.get("/:spotId", async (req, res) => {
  const { spotId } = req.params;
  console.log(req.params)
  
  const oneSpot = await Spot.findByPk(spotId, {
    include: [
      { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] },
      { model: SpotImage, attributes: ["id", ["spotId", "imageableId"], "url"] },
    ],
    where: {
      ownerId: req.user.id,
    },
  });

  if (!oneSpot) {
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
   const findReview = await oneSpot.getReviews({
     attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"], [sequelize.fn("COUNT", sequelize.col("id")), "numReviews"]],
   });
   if (findReview) {
     oneSpot.dataValues.avgRating = findReview[0].dataValues.avgRating;
      oneSpot.dataValues.numReviews = findReview[0].dataValues.numReviews;
     
   } else {
     oneSpot.dataValues.avgRating = null;
   }
  return res.json(oneSpot);
});







module.exports = router