'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AtividadeLazer', 
    [
      // Atividades de Lazer da Thaís
      { id_aluno: 1, id_atividade: 4},
      // Atividades de Lazer do Vinícius
      // Atividades de Lazer do Luiz
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AtividadeLazer', null, {})
  }
};
