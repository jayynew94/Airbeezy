"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "SpotImages",
      [
        {
          spotId: 1,
          url: "https://californiahome.me/wp-content/uploads/2019/03/102MorningdewPl_BackC.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.pinimg.com/originals/9d/7e/12/9d7e126e47fae45d4727ce9bd20dd13e.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://images.squarespace-cdn.com/content/v1/5a5d0da3268b96d1e6039d0a/1533155682425-P5A4VHZCZLL2CA6W2BGP/3653-08.jpg?format=750w",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoumlsz4AwE4WSPhQD4awY38XAOQAQm6zr-w&usqp=CAU",
          preview: true,
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
