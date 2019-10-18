module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define('Aluno', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    id_avatar: DataTypes.INTEGER,
    criado_em: DataTypes.DATE,
    atualizado_em: DataTypes.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  });

  return Aluno;
}