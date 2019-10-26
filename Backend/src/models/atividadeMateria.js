module.exports = (sequelize, DataTypes) => {
    const AtividadeMateria = sequelize.define('AtividadeMateria', 
    // Atributos
    {
      id_materia: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_atividade: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      tem_pontos: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      valor: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      valor_ganho: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
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