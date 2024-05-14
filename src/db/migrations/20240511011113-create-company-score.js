'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('swsCompanyScore', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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
      date_generated: Sequelize.DATE,
      dividend: Sequelize.INTEGER,
      future: Sequelize.INTEGER,
      health: Sequelize.INTEGER,
      management: Sequelize.INTEGER,
      past: Sequelize.INTEGER,
      value: Sequelize.INTEGER,
      misc: Sequelize.INTEGER,
      total: Sequelize.INTEGER,
      sentence: Sequelize.STRING
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('swsCompanyScore');
  }
};
