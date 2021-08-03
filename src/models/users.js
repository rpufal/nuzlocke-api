module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    country: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Users',
  });

  return User;
};

