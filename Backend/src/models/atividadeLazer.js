module.exports = (sequelize, DataTypes) => {
    const AtividadeLazer = sequelize.define('AtividadeLazer', 
    // Atributos
    {
      id_atividade: DataTypes.INTEGER
    },
    // Configurações
    {
      timestamps: false,
      freezeTableName: false,
      tableName: 'AtividadeLazer',
    });

    //Associações
    AtividadeLazer.associate = function(models) {
      AtividadeLazer.belongsTo(models.Curso, {as: 'atividade', targetKey: 'id', foreignKey: 'id_atividade'});
    };
  
    return AtividadeLazer;
  }