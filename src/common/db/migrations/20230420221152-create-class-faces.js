'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ClassFaces', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      classId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      screenshotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      attentionLevel: {
        type: Sequelize.DOUBLE
      },
      faceId: {
        type: Sequelize.STRING
      },
      faceScreenshotIndex: {
        type: Sequelize.INTEGER
      },
      isUncertainAnalysis: {
        type: Sequelize.BOOLEAN
      },
      faceImageUrl: {
        type: Sequelize.STRING
      },
      faceRawEmotions: {
        type: Sequelize.JSONB
      },
      analysisCreatedAt: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('ClassFaces');
  }
};