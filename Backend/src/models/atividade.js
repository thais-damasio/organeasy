module.exports = (sequelize, DataTypes) => {
  const Atividade = sequelize.define('Atividade',
    // Atributos
    {
      titulo: DataTypes.STRING(255),
      descricao: DataTypes.STRING(255),
      concluida: DataTypes.BOOLEAN,
      data_entrega: DataTypes.DATE,
      criado_em: DataTypes.DATE,
      atualizado_em: DataTypes.DATE
    },
    // Configurações
    {
      timestamps: false,
      freezeTableName: false,
      tableName: 'Atividade',
    });

  //Associações
  Atividade.associate = function (models) {
    Atividade.hasMany(models.AtividadeLazer, { as: 'atividadesLazer' });
    Atividade.hasMany(models.AtividadeMateria, { as: 'atividadesMateria' });
    Atividade.hasMany(models.AtividadeCurso, { as: 'atividadesCurso' });
  };

  return Atividade;
}