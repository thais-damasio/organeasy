module.exports = (sequelize, DataTypes) => {
    const Materia = sequelize.define('Materia', 
    // Atributos
    {
      id_curso: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      nome: {
        type: DataTypes.STRING(255),
        allowNull: false
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
      tableName: 'Materia',
    });
  
    //Associações
    Materia.associate = function(models) {
      Materia.belongsTo(models.Curso, {as: 'curso', targetKey: 'id', foreignKey: 'id_curso'});
      Materia.hasMany(models.AtividadeMateria, {as: 'atividadesMateria', targetKey: 'id', foreignKey: 'id_materia'});
    }; 

    return Materia;
  }