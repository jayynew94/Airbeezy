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
        {
          spotId: 5,
          url: "https://cdn.pixabay.com/photo/2013/05/29/00/03/san-diego-114337_1280.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://cdn.pixabay.com/photo/2021/09/11/17/05/basketball-court-6616054_1280.jpg",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://cdn.pixabay.com/photo/2020/07/13/01/38/goal-5399126_1280.jpg",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://cdn.pixabay.com/photo/2019/04/26/19/44/basketball-court-4158462_1280.jpg",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://cdn.pixabay.com/photo/2016/09/20/18/37/venice-beach-1683097_1280.jpg",
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
