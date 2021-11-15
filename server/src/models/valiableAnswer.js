'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ValiableAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Question, { foreignKey: 'questionId', as: 'question' });
    }

    toJSON() { // each time JSON is returned
      return { ...this.get(), id: undefined , questionId: undefined }
    }
  };
  ValiableAnswer.init(
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
    tableName: 'valiableanswers',
    modelName: 'ValiableAnswer',
  }
  );
  return ValiableAnswer;
};