module.exports = (sequelize, DataTypes) => {
  const Atividade = sequelize.define('Atividade',
    // Atributos
    {
      titulo: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      descricao: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      concluida: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
      },
      data_entrega: {
        type: DataTypes.DATE,
        allowNull: true
      },
      criado_em: {
        type: DataTypes.DATE,
        allowNull: true
      },
      atualizado_em: {
        type: DataTypes.DATE,
        allowNull: true
      }
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