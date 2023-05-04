'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Taps', 'lastKegKickedOn', {
      type: Sequelize.DataTypes.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Taps", "lastKegKickedOn");
  }
};
