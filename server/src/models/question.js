'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Exam, { foreignKey: 'examId', as: 'exam' });
      this.hasMany(models.Answer, { 
        foreignKey: 'questionId', 
        as: 'answers', 
        onDelete: 'CASCADE', 
        hooks:true 
      });
      this.hasMany(models.AvaliableAnswer, { 
        foreignKey: 'questionId', 
        as: 'avaliableanswers', 
        onDelete: 'CASCADE', 
        hooks:true 
      });
    }

    toJSON() { // each time JSON is returned
      return { ...this.get(), id: undefined , examId: undefined }
    }
  };
  Question.init(
    {
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
    value: { 
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'questions',
    modelName: 'Question',
  }
  );
  return Question;
};