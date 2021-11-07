'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Exam }) {
      this.hasMany(Exam, { 
        foreignKey: 'userId', 
        as: 'exams', 
        onDelete: 'cascade', 
        hooks:true 
      });
    }

    toJSON() { // each time JSON is returned
      return { ...this.get(), id: undefined, password: undefined }
    }
  };
  User.init(
    {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have a name." },
        notEmpty: { msg: "Name must not be empty." }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have an email." },
        notEmpty: { msg: "Email must not be empty." },
        isEmail: { msg: "Must be a valid email address." }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have a password." },
        notEmpty: { msg: "Password must not be empty." }
      }
    },
    refreshToken: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have a role." },
        notEmpty: { msg: "Role must not be empty." }
      }
    },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  }
  );
  return User;
};