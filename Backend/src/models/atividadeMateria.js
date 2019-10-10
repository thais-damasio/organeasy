module.exports = (sequelize, DataTypes) => {
    const AtividadeMateria = sequelize.define('AtividadeMateria', 
    // Atributos
    {
      id_materia: DataTypes.INTEGER,
      id_atividade: DataTypes.INTEGER,
      tem_pontos: DataTypes.BOOLEAN,
      valor: DataTypes.DOUBLE,
      valor_ganho: DataTypes.DOUBLE,
    },
    // Configurações
    {
      timestamps: false,
      freezeTableName: false,
      tableName: 'AtividadeMateria',
    });

    //Associações
    AtividadeMateria.associate = function(models) {
      AtividadeMateria.belongsTo(models.Materia, {foreignKey: 'id_materia', as: 'materia'});
      AtividadeMateria.belongsTo(models.Atividade, {foreignKey: 'id_atividade', as: 'atividade'});
    }; 
  
    return AtividadeMateria;
  }