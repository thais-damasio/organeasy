'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Atividade', 
    [
      // Atividades da Thaís
      { id: 1, titulo: 'Trabalho de TechWeb', descricao: 'Entrega final do trabalho', concluida: true, data_entrega: '2019-11-11', criado_em: new Date(), atualizado_em: new Date()},
      { id: 2, titulo: 'Lista de Exercício 2', descricao: 'Preparação para a prova', concluida: false, data_entrega: '2019-11-20', criado_em: new Date(), atualizado_em: new Date()},
      { id: 3, titulo: 'Excursão Para Disney', descricao: 'Para pratica inglês', concluida: false, data_entrega: '2019-12-10', criado_em: new Date(), atualizado_em: new Date()},
      { id: 4, titulo: 'Passeio na Pampulha', descricao: 'Para curtir os amigos', concluida: false, data_entrega: '2019-12-20', criado_em: new Date(), atualizado_em: new Date()},
      // Atividades do Vinícius
      { id: 5, titulo: 'Trabalho de Compiladores', descricao: 'Concluir o compilador', concluida: false, data_entrega: '2019-11-29', criado_em: new Date(), atualizado_em: new Date()},
      { id: 6, titulo: 'Excursão Para Paris', descricao: 'Para praticar o francês', concluida: true, data_entrega: '2019-10-29', criado_em: new Date(), atualizado_em: new Date()},
      // Atividades do Luiz
      { id: 7, titulo: 'Visita Técnica', descricao: 'Para conhecer um CPD', concluida: false, data_entrega: '2019-11-25', criado_em: new Date(), atualizado_em: new Date()},
      { id: 8, titulo: 'Luta Oficial na Espanha', descricao: 'Bora bombar', concluida: true, data_entrega: '2019-10-19', criado_em: new Date(), atualizado_em: new Date()}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Atividade', null, {})
  }
};
