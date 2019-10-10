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
      AtividadeMateria.belongsTo(models.Materia, {as: 'materia', targetKey: 'id', foreignKey: 'id_materia'});
      AtividadeMateria.belongsTo(models.Atividade, {as: 'atividade', targetKey: 'id', foreignKey: 'id_atividade'});
    }; 
  
    return AtividadeMateria;
  }