"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "SpotImages",
      [
        {
          spotId: 1,
          url: "www.thisphoto.com",
          preview: true,
        },
        {
          spotId: 2,
          url: "www.thatphoto.com",
          preview: true
        },
        {
          spotId: 3,
          url: "www.otherphoto.com",
          preview: true
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("SpotImages", null, {});
  },
};
