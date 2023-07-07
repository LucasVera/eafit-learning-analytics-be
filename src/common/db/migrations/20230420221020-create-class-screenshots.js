'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ClassScreenshots', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      classId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      screenshotUrl: {
        type: Sequelize.STRING
      },
      screenshotTakenAt: {
        type: Sequelize.INTEGER
      },
      numberOfFaces: {
        type: Sequelize.INTEGER
      },
      averageAttentionLevel: {
        type: Sequelize.DOUBLE
      },
      maxAttentionLevel: {
        type: Sequelize.DOUBLE
      },
      minAttentionLevel: {
        type: Sequelize.DOUBLE
      },
      hasUncertainFaceAnalysis: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ClassScreenshots');
  }
};