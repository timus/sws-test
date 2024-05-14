'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('swsCompanyVolatilityScore', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      company_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        unique: true,
        references: {
          model: 'swsCompany',
          key: 'id'
        }
      },
      score: Sequelize.FLOAT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('swsCompanyVolatilityScore');
  }
};
