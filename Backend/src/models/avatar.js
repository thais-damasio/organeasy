module.exports = (sequelize, DataTypes) => {
    const Avatar = sequelize.define('Avatar', 
    // Atributos
    {
      nome: DataTypes.STRING(255),
      path: DataTypes.STRING(255),
      criado_em: DataTypes.DATE,
      atualizado_em: DataTypes.DATE,
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
      tableName: 'Avatar',
    });

    //Associações
    Avatar.associate = function(models) {
      Avatar.hasMany(models.Aluno, {as: 'alunos', targetKey: 'id', foreignKey: 'id_avatar'});
    }; 
  
    return Avatar;
  }