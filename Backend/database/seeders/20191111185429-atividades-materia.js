'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AtividadeMateria', 
    [
      // Atividades de Matéria da Thaís
      { id: 1, id_materia: 1, id_atividade: 1, tem_pontos: true, valor: 15},
      { id: 2, id_materia: 1, id_atividade: 2, tem_pontos: true, valor: 10},
      // Atividades de Matéria do Vinícius
      { id: 3, id_materia: 5, id_atividade: 5, tem_pontos: true, valor: 30},
      // Atividades de Matéria do Luiz
      { id: 4, id_materia: 6, id_atividade: 7, tem_pontos: false},
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AtividadeMateria', null, {})
  }
};
