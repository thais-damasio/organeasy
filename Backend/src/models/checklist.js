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
      Checklist.belongsTo(models.Atividade, {foreignKey: 'id_atividade', as: 'atividade'});
      Checklist.hasMany(models.OpcaoChecklist);
    }; 
  
    return Checklist;
  }