'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('swsCompanyPriceClose', {
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey: true
      },
      company_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'swsCompany',  
          key: 'id'
        }
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      date_created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('swsCompanyPriceClose');
  }
};
