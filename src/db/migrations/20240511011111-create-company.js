'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('swsCompany', {
      id: {
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ticker_symbol: Sequelize.STRING,
      exchange_symbol: Sequelize.STRING,
      unique_symbol: Sequelize.STRING,
      date_generated: Sequelize.DATE,
      security_name: Sequelize.STRING,
      exchange_country_iso: Sequelize.STRING,
      listing_currency_iso: Sequelize.STRING,
      canonical_url: Sequelize.STRING,
      unique_symbol_slug: Sequelize.STRING,
      score_id:Sequelize.INTEGER
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('swsCompany');
  }
};
