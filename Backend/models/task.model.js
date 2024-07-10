// models/task.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Adjust path as per your project structure
const User = require('./user.model'); // Assuming you have a User model

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending',
  },
});

User.hasMany(Task);
Task.belongsTo(User);

module.exports = Task;
