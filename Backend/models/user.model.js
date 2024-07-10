// models/user.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Ensure correct path to db.config

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
