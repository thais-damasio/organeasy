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
      hooks: {
        beforeCreate: (data, options) => {
          data.criado_em = new Date();
          data.atualizado_em = new Date();
        },
        beforeUpdate: (data, options) => {
          data.atualizado_em = new Date();
        }
      },
      timestamps: false,
      freezeTableName: false,
      tableName: 'Curso',
    });

    //Associações
    Curso.associate = function(models) {
      Curso.belongsTo(models.Aluno, {as: 'aluno', targetKey: 'id', foreignKey: 'id_aluno'});
      Curso.hasMany(models.AtividadeCurso, {as: 'atividadesCurso', targetKey: 'id', foreignKey: 'id_curso'});
      Curso.hasMany(models.Materia, {as: 'materias', targetKey: 'id', foreignKey: 'id_curso'});
    }; 
  
    return Curso;
  }