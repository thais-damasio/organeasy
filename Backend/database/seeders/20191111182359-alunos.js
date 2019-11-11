'use strict';
const bcrypt = require('bcrypt');
const saltRound = 10;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Aluno', 
    [
      { id: 1, nome: 'Thaís Damásio', email: 'thais@mail.com', senha: bcrypt.hashSync('12345', saltRound), id_avatar: 4, criado_em: new Date(), atualizado_em: new Date()},
      { id: 2, nome: 'Vinícius Pacheco', email: 'vinicius@mail.com', senha: bcrypt.hashSync('12345', saltRound), id_avatar: 1, criado_em: new Date(), atualizado_em: new Date()},
      { id: 3, nome: 'Luíz Felipe', email: 'luiz@mail.com', senha: bcrypt.hashSync('12345', saltRound), id_avatar: 2, criado_em: new Date(), atualizado_em: new Date()}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Aluno', null, {})
  }
};
