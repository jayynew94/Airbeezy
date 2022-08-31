const express = require("express");
const {
  Spot,
  User,
  Review,
  Booking,
  SpotImage,
  ReviewImage,
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

//CREATE New Spot
router.post("/", requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const userId = req.user.dataValues.id;

  const createSpot = await Spot.create({
    ownerId: userId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  if (!createSpot) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        address: "Street address is required",
        city: "City is required",
        state: "State is required",
        country: "Country is required",
        lat: "Latitude is not valid",
        lng: "Longitude is not valid",
        name: "Name must be less than 50 characters",
        description: "Description is required",
        price: "Price per day is required",
      },
    });
  }
  res.status(201);
  return res.json(createSpot);
});

//create image
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { url, preview } = req.body;
  const { spotId } = req.params;
  const userId = req.user.id;
  console.log(req.body)

  const spots = await Spot.findByPk(spotId);

  if (spots) {
    const createImage = await SpotImage.create({
      url,
      spotId,
      userId,
      preview,
    });

    const imageAdd = {
      id: createImage.id,
      imageableId: createImage.spotId,
      url: createImage.url,
      preview,
    };
    res.status(200);
    res.json(imageAdd);
  } else {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
});

//edit an Spot
router.put("/:spotId", async (req, res) => {
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const editSpot = await Spot.findByPk(spotId);

  if (editSpot) {
    editSpot.set({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    await editSpot.save();

    res.json(editSpot);
  } else if (!spotId) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        address: "Street address is required",
        city: "City is required",
        state: "State is required",
        country: "Country is required",
        lat: "Latitude is not valid",
        lng: "Longitude is not valid",
        name: "Name must be less than 50 characters",
        description: "Description is required",
        price: "Price per day is required",
      },
    });
  }
  if (!editSpot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
});

// delete a spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const findSpot = await Spot.findByPk(spotId);

  if (!findSpot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  await findSpot.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});


//Get reviews by spot id
router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;

  const getSpot = await Spot.findByPk(spotId)
   if (!getSpot) {
     res.status(404);
     return res.json({
       message: "Spot couldn't be found",
       statusCode: 404,
     });
   }
  const getReviews = await getSpot.getReviews({
    include: [{ model: User, attributes: [
      "id",
      "firstName",
      "lastName"
    ]},
    {model: ReviewImage, attributes:[
      "id",
      "url"
    ]}
  ],
  });


  return res.json(getReviews);
});





module.exports = router