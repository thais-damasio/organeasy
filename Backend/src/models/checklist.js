module.exports = (sequelize, DataTypes) => {
    const Checklist = sequelize.define('Checklist', 
    // Atributos
    {
      id_atividade: DataTypes.INTEGER,
      nome: DataTypes.STRING(255),
      criado_em: DataTypes.DATE,
      atualizado_em: DataTypes.DATE
    },
    // Configurações
    {
      timestamps: false,
      freezeTableName: false,
      tableName: 'Checklist',
    });

    //Associações
    Checklist.associate = function(models) {
      Checklist.belongsTo(models.Atividade, {as: 'atividade', targetKey: 'id', foreignKey: 'id_atividade'});
      Checklist.hasMany(models.OpcaoChecklist, {as: 'opcoes', targetKey: 'id', foreignKey: 'id_checklist'});
    }; 
  
    return Checklist;
  }