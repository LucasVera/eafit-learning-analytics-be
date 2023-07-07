'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Classes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teacherName: {
        type: Sequelize.INTEGER,
      },
      courseId: {
        type: Sequelize.STRING
      },
      mainTopic: {
        type: Sequelize.STRING
      },
      subTopic: {
        type: Sequelize.STRING
      },
      studentsEducationLevel: {
        type: Sequelize.STRING
      },
      startedAt: {
        type: Sequelize.INTEGER
      },
      endedAt: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Classes');
  }
};
