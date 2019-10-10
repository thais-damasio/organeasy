module.exports = (sequelize, DataTypes) => {
    const AtividadeCurso = sequelize.define('AtividadeCurso', 
    // Atributos
    {
      id_curso: DataTypes.INTEGER,
      id_atividade: DataTypes.INTEGER,
      tem_pontos: DataTypes.BOOLEAN,
      valor: DataTypes.DOUBLE,
      valor_ganho: DataTypes.DOUBLE,
    },
    // Configurações
    {
      timestamps: false,
      freezeTableName: false,
      tableName: 'AtividadeCurso',
    });

    //Associações
    AtividadeCurso.associate = function(models) {
      AtividadeCurso.belongsTo(models.Curso, {foreignKey: 'id_curso', as: 'curso'});
      AtividadeCurso.belongsTo(models.Atividade, {foreignKey: 'id_atividade', as: 'atividade'});
    };
  
    return AtividadeCurso;
  }