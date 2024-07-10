const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('kavi', 'root', 'kaviyasaru11', {
  dialect: 'mysql',
  host: 'localhost',
  define: {
    timestamps: true,
  },
});

module.exports = sequelize;
