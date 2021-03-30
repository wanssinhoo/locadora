module.exports = (sequelize, DataTypes) => {
  const Filmes = sequelize.define("Filmes", {
    nome: DataTypes.STRING,
    diretor: DataTypes.STRING,
    estoque : DataTypes.INTEGER,
    status: DataTypes.INTEGER
  });
  
  return Filmes;
};