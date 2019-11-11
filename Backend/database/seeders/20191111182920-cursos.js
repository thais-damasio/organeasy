'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Curso', 
    [
      // Cursos da Thaís
      { id: 1, nome: 'Sistemas de Informação', tem_materias: true, id_aluno: 1,criado_em: new Date(), atualizado_em: new Date()},
      { id: 2, nome: 'Inglês', tem_materias: false, id_aluno: 1,criado_em: new Date(), atualizado_em: new Date()},
      { id: 3, nome: 'Designer', tem_materias: true, id_aluno: 1,criado_em: new Date(), atualizado_em: new Date()},
      // Cursos do Vinícius
      { id: 4, nome: 'Sistemas de Informação', tem_materias: true, id_aluno: 2,criado_em: new Date(), atualizado_em: new Date()},
      { id: 5, nome: 'Francês', tem_materias: false, id_aluno: 2,criado_em: new Date(), atualizado_em: new Date()},
      // Cursos do Luiz
      { id: 6, nome: 'Sistemas de Informação', tem_materias: true, id_aluno: 3,criado_em: new Date(), atualizado_em: new Date()},
      { id: 7, nome: 'Boxe', tem_materias: false, id_aluno: 3,criado_em: new Date(), atualizado_em: new Date()}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Curso', null, {})
  }
};
