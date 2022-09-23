"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Reviews",
      [
        {
          review: "This Spot is Amazing",
          stars: 5,
          userId: 1,
          spotId: 1,
        },
        {
          review: "This Spot is Bad",
          stars: 2,
          userId: 2,
          spotId: 2,
        },
        {
          review: "Had a great time",
          stars: 4,
          userId: 3,
          spotId: 3,
        },
        {
          review: "This Spot was fun",
          stars: 4,
          userId: 1,
          spotId: 4,
        },
        {
          review: "This Spot Was great",
          stars: 4,
          userId: 2,
          spotId: 5,
        },
        {
          review: "I didnt like this spot",
          stars: 2,
          userId: 3,
          spotId: 6,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("Reviews", null, {});
  },
};
