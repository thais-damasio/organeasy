module.exports = (sequelize, DataTypes) => {
    const AtividadeCurso = sequelize.define('AtividadeCurso', 
    // Atributos
    {
      id_curso: {
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
      }
    },
    // Configurações
    {
      timestamps: false,
      freezeTableName: false,
      tableName: 'AtividadeCurso',
    });

    //Associações
    AtividadeCurso.associate = function(models) {
      AtividadeCurso.belongsTo(models.Curso, {as: 'curso', targetKey: 'id', foreignKey: 'id_curso'});
      AtividadeCurso.belongsTo(models.Atividade, {as: 'atividade', targetKey: 'id', foreignKey: 'id_atividade'});
    };
  
    return AtividadeCurso;
  }