"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Reviews",
      [
        {
          review: "This Spot is Amazing, We had a Great Time",
          stars: 5,
          userId: 1,
          spotId: 2,
        },
        {
          review: "This Spot is Bad, only because I broke my ankle",
          stars: 2,
          userId: 2,
          spotId: 1,
        },
        {
          review: "Had a great time, wish they had snacks",
          stars: 4,
          userId: 3,
          spotId: 7,
        },
        {
          review: "This Spot was fun, would do it again",
          stars: 4,
          userId: 1,
          spotId: 4,
        },
        {
          review: "This Spot Was great, crowd was lit",
          stars: 4,
          userId: 2,
          spotId: 5,
        },
        {
          review: "I wish i could give it 6stars",
          stars: 5,
          userId: 3,
          spotId: 6,
        },
        {
          review: "I didnt like this spot, never again",
          stars: 2,
          userId: 3,
          spotId: 6,
        },
        {
          review: "I Loved it here",
          stars: 5,
          userId: 3,
          spotId: 6,
        },
        {
          review: "I can come here everyday",
          stars: 3,
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
