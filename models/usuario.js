module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define("Usuarios", {
    nome: DataTypes.STRING,
    senha: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.INTEGER
  });
  
  return Usuarios;
};