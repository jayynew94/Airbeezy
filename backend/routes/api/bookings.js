const express = require("express");
const { Spot, User, Review, Booking, SpotImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");
const router = express.Router();


router.get("/current", requireAuth, async (req, res) => {
  const currentBooking = await Booking.findAll({
    where: {
      userId: req.user.id,
    },
  });

  for (let booking of currentBooking) {
    const spot = await booking.getSpot();
    const findImage = await SpotImage.findOne({
      attributes: ["url"],
      where: {
        preview: true,
        spotId: spot.id,
      },
      raw: true,
    });

    if (findImage) {
      spot.dataValues.preview = findImage.url;
    } else {
      spot.dataValues.preview = null;
    }
    booking.dataValues.Spot = spot;
  }
  res.status(200);
  return res.json(currentBooking);
});








module.exports = router