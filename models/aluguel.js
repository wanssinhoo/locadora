module.exports = (sequelize, DataTypes) => {
  const Alugados = sequelize.define("Alugados", {
    usuario_id: DataTypes.INTEGER,
    filme_id: DataTypes.INTEGER,
    data_locacao: DataTypes.DATE,
    data_entrega: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {});

  Alugados.associate = function(models) {
    Alugados.belongsTo(models.Usuarios, {foreignKey: 'usuario_id'})
    Alugados.belongsTo(models.Filmes, {foreignKey: 'filme_id'})
  };
  
  return Alugados;
};