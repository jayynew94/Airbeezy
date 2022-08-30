const express = require("express");
const { Spot, User, Review, Image } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

//Get reviews of current User
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.dataValues.id;
  const getReviews = await Review.findAll({
    include: [{ model: User, Spot, where: { id: userId } }],
  });
  return res.json(getReviews);
});



module.exports = router