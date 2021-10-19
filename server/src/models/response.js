'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Response extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Exam, { foreignKey: 'examId' });
      this.hasMany(models.Answer, { foreignKey: 'responseId' });
    }

    toJSON() { // each time JSON is returned
      return { ...this.get(), id: undefined }
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
    }
  }, {
    sequelize,
    tableName: 'responses',
    modelName: 'Response',
  }
  );
  return Response;
};