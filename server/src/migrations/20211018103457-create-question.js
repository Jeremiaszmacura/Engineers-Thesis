'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      question:{ 
        type: DataTypes.STRING,
        allowNull: false
      },
      type: { 
        type: DataTypes.STRING,
        allowNull: false
      },
      valiableAnswers: { 
        type: DataTypes.STRING,
        allowNull: false
      },
      answer: { 
        type: DataTypes.STRING,
        allowNull: false
      },
      examId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'exams',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('questions');
  }
};