const express = require("express");
const { Spot, User, Review, ReviewImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

//Get reviews of current User
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.dataValues.id;
  const getReviews = await Review.findAll({
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"]},
      { model: Spot, attributes: ["id", "ownerId", "address","city", "country","lat","lng","name","price",["previewImage"]] },
      { model: ReviewImage, attributes: ["id","url"]},
    ],
    where:{
        userId: userId
    }
  });
  return res.json({
      "Reviews":getReviews
    });
});





module.exports = router