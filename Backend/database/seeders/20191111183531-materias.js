'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Materia', 
    [
      // Matérias da Thaís
      { id: 1, nome: 'Tecnologias WEB', id_curso: 1,criado_em: new Date(), atualizado_em: new Date()},
      { id: 2, nome: 'Grafos', id_curso: 1,criado_em: new Date(), atualizado_em: new Date()},
      { id: 3, nome: 'História da Arte', id_curso: 3,criado_em: new Date(), atualizado_em: new Date()},
      // Matérias do Vinícius
      { id: 4, nome: 'Tecnologias WEB', id_curso: 4,criado_em: new Date(), atualizado_em: new Date()},
      { id: 5, nome: 'Compiladores', id_curso: 4,criado_em: new Date(), atualizado_em: new Date()},
      // Matérias do Luiz
      { id: 6, nome: 'Tecnologias WEB', id_curso: 6,criado_em: new Date(), atualizado_em: new Date()},
      { id: 7, nome: 'Redes de Computadores', id_curso: 6,criado_em: new Date(), atualizado_em: new Date()}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Materia', null, {})
  }
};
