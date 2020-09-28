module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    is_verified: DataTypes.INTEGER,
    email_verified_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
