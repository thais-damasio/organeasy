'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AtividadeCurso', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_curso: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Curso',
            schema: 'schema'
          },
          key: 'id'
        },
      },
      id_atividade: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Atividade',
            schema: 'schema'
          },
          key: 'id'
        },
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      tem_materias: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      tem_pontos: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      valor: {
        allowNull: true,
        type: Sequelize.DOUBLE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AtividadeCurso');
  }
};
