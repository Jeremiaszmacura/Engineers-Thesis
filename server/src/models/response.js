'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Response extends Model {
    static associate(models) {
      this.belongsTo(models.Exam, { foreignKey: 'examId', as: 'exam' });
      this.hasMany(models.Answer, { 
        foreignKey: 'responseId', 
        as: 'answers', 
        onDelete: 'CASCADE', 
        hooks:true 
      });
    }

    toJSON() { // each time JSON is returned
      return { ...this.get(), id: undefined, examId: undefined }
    }
  };
  Response.init(
    {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'responses',
    modelName: 'Response',
  }
  );
  return Response;
};