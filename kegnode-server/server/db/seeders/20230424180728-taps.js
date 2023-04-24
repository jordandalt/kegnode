"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Taps", [
      {
        tapIdentity: "tap0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tapIdentity: "tap1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tapIdentity: "tap2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tapIdentity: "tap3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Taps", null, {});
  },
};
