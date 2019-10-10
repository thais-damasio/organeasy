module.exports = (sequelize, DataTypes) => {
    const Curso = sequelize.define('Curso', 
    // Atributos
    {
      nome: DataTypes.STRING(255),
      tem_materias: DataTypes.BOOLEAN,
      id_aluno: DataTypes.INTEGER,
      criado_em: DataTypes.DATE,
      atualizado_em: DataTypes.DATE,
    },
    // Configurações
    {
      timestamps: false,
      freezeTableName: false,
      tableName: 'Curso',
    });

    //Associações
    Curso.associate = function(models) {
      Curso.belongsTo(models.Aluno, {foreignKey: 'id_aluno', as: 'aluno'});
      Curso.hasMany(models.AtividadeCurso, {as: 'atividadesCurso'});
      Curso.hasMany(models.Materia, {as: 'materias'});
    }; 
  
    return Curso;
  }