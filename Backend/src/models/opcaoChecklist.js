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
      tableName: 'OpcaoChecklist',
    });

    //Associações
    OpcaoChecklist.associate = function(models) {
      OpcaoChecklist.belongsTo(models.Checklist, {as: 'checklist', targetKey: 'id', foreignKey: 'id_checklist'});
    }; 
  
    return OpcaoChecklist;
  }