"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Taps", [
      {
        identity: "tap0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        identity: "tap1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        identity: "tap2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        identity: "tap3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Taps", null, {});
  },
};
