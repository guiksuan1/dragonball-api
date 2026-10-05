'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('personagens', {
      id: { 
        allowNull: false, 
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER 
      },
      nome: { 
        type: Sequelize.STRING(100), 
        allowNull: false 
      },
      raca: { 
        type: Sequelize.STRING(50), 
        allowNull: false 
      },
      poderDeLuta: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        defaultValue: 0 
      },
      planetaOrigem: { 
        type: Sequelize.STRING(100), 
        allowNull: true 
      },
      createdAt: { 
        allowNull: false, 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.fn('NOW') 
      },
      updatedAt: { 
        allowNull: false, 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.fn('NOW') 
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('personagens');
  }
};