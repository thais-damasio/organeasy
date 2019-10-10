const bcrypt = require('bcrypt');
const saltRound = 10;

module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define('Aluno', 
  // Atributos
  {
    nome: DataTypes.STRING(255),
    email: DataTypes.STRING(255),
    senha: DataTypes.STRING(255),
    id_avatar: DataTypes.INTEGER,
    criado_em: DataTypes.DATE,
    atualizado_em: DataTypes.DATE,
  },
  // Configurações
  {
    hooks: {
      beforeCreate: (user, options) => {
        let senhaCrypt = bcrypt.hashSync(user.senha, saltRound);
        user.senha = senhaCrypt;
      }
    },
    timestamps: false,
    freezeTableName: false,
    tableName: 'Aluno',
  });

  //Associações
  Aluno.associate = function(models) {
    models.Aluno.belongsTo(models.Avatar, {foreignKey: 'id_avatar', as: 'avatar'})
    models.Aluno.hasMany(models.Curso, {as: 'cursos'})
  };
  // Métodos de instância
  Aluno.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.senha);
  }

  return Aluno;
}