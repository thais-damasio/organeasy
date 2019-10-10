module.exports = (sequelize, DataTypes) => {
    const Avatar = sequelize.define('Avatar', 
    // Atributos
    {
      path: DataTypes.STRING(255),
      criado_em: DataTypes.DATE,
      atualizado_em: DataTypes.DATE,
    },
    // Configurações
    {
      timestamps: false,
      freezeTableName: false,
      tableName: 'Avatar',
    });

    //Associações
    Avatar.associate = function(models) {
      Avatar.hasMany(models.Aluno, { as: 'alunos'});
    }; 
  
    return Avatar;
  }