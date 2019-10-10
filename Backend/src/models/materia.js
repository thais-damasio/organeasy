module.exports = (sequelize, DataTypes) => {
    const Materia = sequelize.define('Materia', 
    // Atributos
    {
      id_curso: DataTypes.INTEGER,
      nome: DataTypes.STRING(255),
      criado_em: DataTypes.DATE,
      atualizado_em: DataTypes.DATE
    },
    // Configurações
    {
      timestamps: false,
      freezeTableName: false,
      tableName: 'Materia',
    });
  
    //Associações
    Materia.associate = function(models) {
      Materia.belongsTo(models.Curso, {foreignKey: 'id_curso', as: 'curso'});
      Materia.hasMany(models.AtividadeMateria, {as: 'atividadesMaterias'});
    }; 

    return Materia;
  }