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
          name: "Icy Court",
          description: "Half Court Basketball",
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
          name: "Lillards House",
          description: "Backyard Halfcourt Mansion",
          price: 240,
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
        {
          ownerId: 1,
          address: "269 Orange Street",
          city: "Dallas",
          state: "Texas",
          country: "USA",
          lat: 79.238243,
          lng: 101.304983,
          name: "Backyard Basketball",
          description: "Basketball Court in backyard",
          price: 1000,
        },
        {
          ownerId: 2,
          address: "269 Plum Street",
          city: "Ft. Worth",
          state: "Texas",
          country: "USA",
          lat: 69.238243,
          lng: 91.304983,
          name: "Beautiful Court",
          description: "Basketball Court in texas",
          price: 123,
        },
        {
          ownerId: 2,
          address: "290 Kiwi Street",
          city: "Coppell",
          state: "Texas",
          country: "USA",
          lat: 89.238243,
          lng: 121.304983,
          name: "Island Ball",
          description: "Basketball Court on an island",
          price: 335,
        },
        {
          ownerId: 3,
          address: "290 Grape Street",
          city: "Plano",
          state: "Texas",
          country: "USA",
          lat: 89.238243,
          lng: 121.304983,
          name: "Football field",
          description: "Highschool football stadium",
          price: 335,
        },
        {
          ownerId: 2,
          address: "210 Elderberry Street",
          city: "Coppell",
          state: "Texas",
          country: "USA",
          lat: 89.238243,
          lng: 121.304983,
          name: "Full Court",
          description: "Basketball Court with full court",
          price: 335,
        },
        {
          ownerId: 2,
          address: "220 Pear Street",
          city: "Coppell",
          state: "Texas",
          country: "USA",
          lat: 89.238243,
          lng: 121.304983,
          name: "Basketball Court",
          description: "Basketball Court in paradise",
          price: 335,
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
