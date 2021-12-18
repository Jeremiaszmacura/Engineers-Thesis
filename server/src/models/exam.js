'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    static associate(models) {
      // this - referes to Exam class there
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      this.hasMany(models.Question, { 
        foreignKey: 'examId', 
        as: 'questions', 
        onDelete: 'CASCADE', 
        hooks:true 
      });
    }

    toJSON() { // each time JSON is returned
      return { ...this.get(), id: undefined, userId: undefined }
    }
  };
  Exam.init(
    {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startsAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endsAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accessCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pointsToGet: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    showScore: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    tableName: 'exams',
    modelName: 'Exam',
  }
  );
  return Exam;
};