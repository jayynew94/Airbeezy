"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Spots",
      [
        {
          ownerId: 1,
          address: "123 Apple Street",
          city: "New Orleans",
          state: "Louisiana",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "New House",
          description: "Beautiful shotgun home",
          price: 300,
        },
        {
          ownerId: 2,
          address: "456 Orange Street",
          city: "Arlington",
          state: "Texas",
          country: "USA",
          lat: 18.29384393,
          lng: -98.3920424,
          name: "Hot house",
          description: "Its Hot In Texas",
          price: 600,
        },
        {
          ownerId: 3,
          address: "789 Peach Street",
          city: "Dallas",
          state: "Texas",
          country: "USA",
          lat: 78.238243,
          lng: 100.304983,
          name: "Big House",
          description: "Beautiful Mansion",
          price: 1000,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("Spots", null, {});
  },
};
