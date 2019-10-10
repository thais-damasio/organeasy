module.exports = (sequelize, DataTypes) => {
    const OpcaoChecklist = sequelize.define('OpcaoChecklist', 
    // Atributos
    {
      id_checklist: DataTypes.INTEGER,
      descricao: DataTypes.STRING(255),
      feito: DataTypes.BOOLEAN,
      criado_em: DataTypes.DATE,
      atualizado_em: DataTypes.DATE
    },
    // Configurações
    {
      timestamps: false,
      freezeTableName: false,
      tableName: 'OpcaoChecklist',
    });

    //Associações
    OpcaoChecklist.associate = function(models) {
      OpcaoChecklist.belongsTo(models.Checklist, {as: 'checklist', targetKey: 'id', foreignKey: 'id_checklist'});
    }; 
  
    return OpcaoChecklist;
  }