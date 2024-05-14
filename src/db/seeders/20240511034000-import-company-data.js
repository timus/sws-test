'use strict';

const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const companies = [];
    const filePath = path.join(__dirname, '../fixtures/company-data.csv');
    
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          companies.push({
            id: row.id,
            name: row.name,
            ticker_symbol: row.ticker_symbol,
            exchange_symbol: row.exchange_symbol,
            unique_symbol: row.unique_symbol,
            date_generated: new Date(row.date_generated),
            security_name: row.security_name,
            exchange_country_iso: row.exchange_country_iso,
            listing_currency_iso: row.listing_currency_iso,
            canonical_url: row.canonical_url,
            unique_symbol_slug: row.unique_symbol_slug,
            score_id: parseInt(row.score_id, 10)  
          });
        })
        .on('end', () => {
          queryInterface.bulkInsert('swsCompany', companies)
            .then(() => resolve())
            .catch((error) => reject(error));
        });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('swsCompany', null, {});
  }
};
