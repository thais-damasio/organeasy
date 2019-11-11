'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AtividadeCurso', 
    [
      // Atividades de Curso da Thaís
      { id: 1, id_curso: 2, id_atividade: 3, tem_pontos: true, valor: 20},
      // Atividades de Curso do Vinícius
      { id: 2, id_curso: 5, id_atividade: 6, tem_pontos: false, valor: 25, valor_ganho: 25},
      // Atividades de Curso do Luiz
      { id: 3, id_curso: 7, id_atividade: 8, tem_pontos: false}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AtividadeCurso', null, {})
  }
};
