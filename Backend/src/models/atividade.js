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
      tableName: 'Atividade',
    });

  //Associações
  Atividade.associate = function (models) {
    Atividade.hasMany(models.AtividadeLazer, { as: 'atividadesLazer', targetKey: 'id', foreignKey: 'id_atividade'});
    Atividade.hasMany(models.AtividadeMateria, { as: 'atividadesMateria', targetKey: 'id', foreignKey: 'id_atividade'});
    Atividade.hasMany(models.AtividadeCurso, { as: 'atividadesCurso', targetKey: 'id', foreignKey: 'id_atividade'});
  };

  return Atividade;
}