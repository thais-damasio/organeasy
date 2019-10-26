module.exports = (sequelize, DataTypes) => {
    const OpcaoChecklist = sequelize.define('OpcaoChecklist', 
    // Atributos
    {
      id_checklist: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      descricao: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      feito: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
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
      tableName: 'OpcaoChecklist',
    });

    //Associações
    OpcaoChecklist.associate = function(models) {
      OpcaoChecklist.belongsTo(models.Checklist, {as: 'checklist', targetKey: 'id', foreignKey: 'id_checklist'});
    }; 
  
    return OpcaoChecklist;
  }