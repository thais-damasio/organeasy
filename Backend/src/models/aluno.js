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
          user.criado_em = new Date();
          user.atualizado_em = new Date();
        },
        beforeUpdate: (data, options) => {
          data.atualizado_em = new Date();
        }
      },
      timestamps: false,
      freezeTableName: false,
      tableName: 'Aluno',
    });

  // Associações
  Aluno.associate = function (models) {
    models.Aluno.belongsTo(models.Avatar, { as: 'avatar', targetKey: 'id', foreignKey: 'id_avatar' })
    models.Aluno.hasMany(models.Curso, { as: 'cursos' })
  };
  // Métodos de instância
  Aluno.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.senha);
  }
  Aluno.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.senha;
    return values;
  }
  // Métodos da classe
  Aluno.isUniqueEmail = async function (email) {
    let alunos = await Aluno.findAll({ where: { email: email } })
      .catch(err => {
        throw Error(err);
      });

    if(alunos.length > 0){
      return false;}
    else{
      return true;}
  }

  return Aluno;
}