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
      AtividadeLazer.belongsTo(models.Curso, {foreignKey: 'id_atividade', as: 'atividade'});
    };
  
    return AtividadeLazer;
  }