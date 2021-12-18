'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AvaliableAnswer extends Model {
    static associate(models) {
      this.belongsTo(models.Question, { foreignKey: 'questionId', as: 'question' });
    }

    toJSON() { // each time JSON is returned
      return { ...this.get(), id: undefined , questionId: undefined }
    }
  };
  AvaliableAnswer.init(
    {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    answer:{ 
      type: DataTypes.STRING,
      allowNull: false
    },
    isCorrect: { 
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'avaliableanswers',
    modelName: 'AvaliableAnswer',
  }
  );
  return AvaliableAnswer;
};