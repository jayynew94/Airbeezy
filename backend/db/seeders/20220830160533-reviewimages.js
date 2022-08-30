'use strict';

module.exports = {
  up: async  (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ReviewImages", [
      {
        reviewId: 1,
        url: "www.thisphoto.com",
      },
      {
        reviewId: 2,
        url: "www.thatphoto.com",
      },
      {
        reviewId: 3,
        url: "www.otherphoto.com",
      },
    ],
    {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("ReviewImages",null,{});
  }
};
