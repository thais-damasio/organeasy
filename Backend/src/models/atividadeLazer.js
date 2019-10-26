module.exports = (sequelize, DataTypes) => {
    const AtividadeLazer = sequelize.define('AtividadeLazer', 
    // Atributos
    {
      id_atividade: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_aluno: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    // Configurações
    {
      timestamps: false,
      freezeTableName: false,
      tableName: 'AtividadeLazer',
    });

    //Associações
    AtividadeLazer.associate = function(models) {
      AtividadeLazer.belongsTo(models.Atividade, {as: 'atividade', targetKey: 'id', foreignKey: 'id_atividade'});
      AtividadeLazer.belongsTo(models.Aluno, {as: 'aluno', targetKey: 'id', foreignKey: 'id_aluno'});
    };
  
    return AtividadeLazer;
  }