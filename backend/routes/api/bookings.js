const express = require("express");
const { Spot, User, Review, Booking, SpotImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");
const router = express.Router();


router.get("/current", requireAuth, async (req, res) => {
    const userId = req.user.id
  const currentBooking = await Booking.findAll({
    include: [
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],include:{model: SpotImage, where:{preview:true}}
      },
    ],
    where: {
      userId: userId,
    },
    nest: true,
  });

      let bookingList = []
  currentBooking.forEach((booking) => {
    bookingList.push(booking.toJSON())
  
})
bookingList.forEach(booking => {
  booking.Spot.SpotImages.forEach(spotImage => { 
  
    if(spotImage.preview === true){
      booking.Spot.previewImage = spotImage.url
    }
   
  })


  delete booking.Spot.SpotImages

});
    return res.json({
        "bookings": bookingList
    })
})


//edit a booking
router.put('/:bookingId',requireAuth, async(req, res) => {
    const { bookingId } = req.params
  
    const { startDate, endDate } = req.body

    const editBookings = await Booking.findByPk(bookingId)

        if(!editBookings){
           return res.json({
             message: "Booking couldn't be found",
             statusCode: 404,
           });
        }
        
    const getAllBookings = await Booking.findAll({
      where: {
        spotId: editBookings.spotId,
        startDate: { [Op.lte]: endDate },
        endDate: { [Op.gte]: startDate },
      },
    });

       if (editBookings.endDate < Date.now()) {
         res.status(403);
         return res.json({
           message: "Past bookings can't be modified",
           statusCode: 403,
         });
       }
    if(getAllBookings.length >= 1){
      res.status(403)
      return res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
      }
      if(endDate < startDate){
        res.status(400)
        return res.json({
          message: "Validation error",
          statusCode: 400,
          errors: {
            endDate: "endDate cannot come before startDate",
          },
        });
    } 
    if(editBookings){
        editBookings.set({
            startDate,
            endDate
        })
        await editBookings.save()
         return res.json(editBookings)
    }else {
      res.status(404)
      return res.json({
        message: "Booking couldn't be found",
        statusCode: 404,
      });
    }
})
//delete a booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const { bookingId } = req.params;
  const findBooking = await Booking.findByPk(bookingId);

  if (!findBooking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  await findBooking.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
}); 



module.exports = router